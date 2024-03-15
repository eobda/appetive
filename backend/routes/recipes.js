const router = require("express").Router();
const db = require("../db/connection");
const {
  getRecipes,
  getRecipeById,
  getReviewsByRecipeId,
  addRecipe,
} = require("../db/queries/recipes");
const {
  getCuisineByName,
  getDietByName,
  getMealTypeByName,
  getIntoleranceByName,
  getUsernameById,
  getUserNameById,
  getCuisineNameById,
  getDietNameById,
  getMealTypeNameById,
  getIntoleranceNameById,
} = require("../db/queries/recipes_helpers");
const jwtDecoder = require("../utils/jwtDecoder");

router.get("/", async (_req, res) => {
  try {
    const allRecipes = await getRecipes();
    if ("message" in allRecipes) {
      // No recipes found
      res.status(404).json(allRecipes);
    } else {
      // Recipes found, return the array
      res.status(200).json(allRecipes);
    }
  } catch (error) {
    console.error("Error in api/recipes route:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const recipeId = req.params.id;
    if (!recipeId) {
      return res.status(400).json("Invalid recipe ID");
    }

    const results = [];

    const recipe = await getRecipeById(recipeId);

    if ("message" in recipe) {
      // Recipe not found
      res.status(404).json(recipe);
    } else {
      // Recipe found

      const recipe_obj = {};

      //add recipe id into recipe object
      recipe_obj["id"] = recipe.id;

      //add title into recipe object
      recipe_obj["title"] = recipe.title;

      //add image into recipe object
      recipe_obj["image"] = recipe.image;

      //add instructions into recipe object
      recipe_obj["instructions"] = recipe.instructions;

      //add preparation minutes into recipe object
      recipe_obj["readyInMinutes"] = recipe.prep_time;

      //add no. of servings into recipe object
      recipe_obj["servings"] = recipe.number_of_servings;

      //get author of the recipe by user id
      const user_name = await getUserNameById(recipe.user_id);
      console.log(user_name);
      //add author name into recipe object
      recipe_obj["sourceName"] = user_name;

      //get cuisine of the recipe by cuisine id
      const cuisine_name = await getCuisineNameById(recipe.cuisine_id);
      console.log(cuisine_name);
      //add cuisine name into recipe object
      recipe_obj["cuisines"] = [cuisine_name];

      //get diet of the recipe by diet id
      const diet_name = await getDietNameById(recipe.diet_id);
      console.log(diet_name);
      //add diet name into recipe object
      recipe_obj["diets"] = [diet_name];

      //get meal_type of the recipe by meal_type id
      const meal_type_name = await getMealTypeNameById(recipe.meal_type_id);
      console.log(meal_type_name);
      //add meal_type name into recipe object
      recipe_obj["type"] = [meal_type_name];

      //get intolerance of the recipe by intolerance id
      const intolerance_name = await getIntoleranceNameById(
        recipe.intolerance_id
      );
      console.log(intolerance_name);
      //add meal_type name into recipe object
      // recipe_obj["type"] = [intolerance_name];

      res.status(200).json(recipe);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

router.get("/:id/reviews", async (req, res) => {
  try {
    const recipeId = req.params.id;
    if (!recipeId) {
      return res.status(400).json("Invalid recipe ID");
    }
    const reviews = await getReviewsByRecipeId(recipeId);

    if ("message" in reviews) {
      // No reviews found for the recipe
      res.status(404).json(reviews);
    } else {
      // Reviews found, return the array
      res.status(200).json(reviews);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

router.post("/", async (req, res) => {
  try {
    const newRecipe = req.body;
    const currentTime = new Date();
    const { user } = await jwtDecoder(newRecipe.user_id);

    newRecipe.user_id = user;
    newRecipe.created_at = currentTime;
    newRecipe.updated_at = currentTime;

    await addRecipe(newRecipe);
    res.status(201).send();
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

router.post("/search", async (req, res) => {
  try {
    const {
      title,
      diet,
      cuisine,
      mealType,
      intolerance,
      minCalories,
      maxCalories,
    } = req.query;

    const results = [];

    // database query based on search parameters
    //1 = 1 as placeholder so that the query wouldn't break in any case like if no parameters are passed or only cuisine is passed etc.
    let queryString = "SELECT * FROM recipes WHERE 1 = 1";
    const queryParams = [];

    //Add conditions based on query parameters
    if (title) {
      queryString += ` AND title ILIKE $${queryParams.length + 1}`;
      queryParams.push(`%${title}%`);
      const recipes = await db.query(queryString, queryParams);

      //get title and image for recipe and put it inside an object
      for (const recipe of recipes.rows) {
        const recipe_obj = {};
        recipe_obj["title"] = recipe.title;
        recipe_obj["image"] = recipe.image;

        results.push(recipe_obj);
      }
      return res.status(200).json(results);
    }

    if (cuisine) {
      const id = await getCuisineByName(cuisine);
      console.log(id);
      queryString += ` AND cuisine_id = $${queryParams.length + 1}`;
      queryParams.push(id);
    }

    if (diet) {
      const diet_array = diet.split(",");

      if (diet_array.length === 1) {
        const id = await getDietByName(diet_array[0]);
        console.log(id);
        queryString += ` AND diet_id = $${queryParams.length + 1}`;
        queryParams.push(id);
      } else {
        //get diet_id for each diet value
        const diet_ids = await Promise.all(
          diet_array.map((d) => getDietByName(d.trim()))
        );
        console.log(diet_ids);

        queryString += ` AND diet_id IN (${diet_ids
          .map((_, index) => `$${queryParams.length + index + 1}`)
          .join(", ")})`;
        queryParams.push(...diet_ids);
      }
    }

    if (mealType) {
      const id = await getMealTypeByName(mealType);
      console.log(id);
      queryString += ` AND meal_type_id = $${queryParams.length + 1}`;
      queryParams.push(id);
    }

    if (intolerance) {
      const intolerance_array = intolerance.split(",");

      if (intolerance_array.length === 1) {
        const id = await getIntoleranceByName(intolerance[0]);
        console.log(id);
        queryString += ` AND intolerance_id = $${queryParams.length + 1}`;
        queryParams.push(id);
      } else {
        const intolerance_ids = await Promise.all(
          intolerance_array.map((intolerance) =>
            getIntoleranceByName(intolerance.trim())
          )
        );
        console.log(intolerance_ids);

        queryString += ` AND intolerance_id IN (${intolerance_ids
          .map((_, index) => `$${queryParams.length + index + 1}`)
          .join(", ")})`;
        queryParams.push(...intolerance_ids);
      }
    }

    if (minCalories && maxCalories) {
      queryString += ` AND calories BETWEEN $${queryParams.length + 1} AND $${
        queryParams.length + 2
      }`;
      queryParams.push(minCalories);
      queryParams.push(maxCalories);
    } else if (minCalories) {
      queryString += ` AND calories >= $${queryParams.length + 1}`;
      queryParams.push(minCalories);
    } else if (maxCalories) {
      queryString += ` AND calories <= $${queryParams.length + 1}`;
      queryParams.push(maxCalories);
    }
    console.log(queryString);
    const recipes = await db.query(queryString, queryParams);

    //get title and image for recipe and put it inside an object
    for (const recipe of recipes.rows) {
      const recipe_obj = {};
      recipe_obj["title"] = recipe.title;
      recipe_obj["image"] = recipe.image;

      results.push(recipe_obj);
    }
    return res.status(200).json(results);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
