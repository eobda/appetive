const db = require("../connection");

// lookup cuisine and return ID
const getCuisineByName = async function (cuisineName) {
  try {
    const queryString = `SELECT id FROM cuisines WHERE name LIKE $1;`;
    const queryParams = [`%${cuisineName}%`];
    const cuisine = await db.query(queryString, queryParams);

    if (cuisine.rows.length === 0) {
      return { message: "Cuisine not found" };
    }

    return cuisine.rows[0];
  } catch (error) {
    console.error("Error in getCuisineByName:", error.message);
    throw error;
  }
};

// lookup diet and return ID
const getDietByName = async function (dietName) {
  try {
    const queryString = `SELECT id FROM diets WHERE name LIKE $1;`;
    const queryParams = [`%${dietName}%`];
    const diet = await db.query(queryString, queryParams);

    if (diet.rows.length === 0) {
      return { message: "Diet not found" };
    }

    return diet.rows[0];
  } catch (error) {
    console.error("Error in getDietByName:", error.message);
    throw error;
  }
};

// lookup meal_type and return ID
const getMealTypeByName = async function (mealTypeName) {
  try {
    const queryString = `SELECT id FROM meal_types WHERE name LIKE $1;`;
    const queryParams = [`%${mealTypeName}%`];
    const mealType = await db.query(queryString, queryParams);

    if (mealType.rows.length === 0) {
      return { message: "Meal Type not found" };
    }

    return mealType.rows[0];
  } catch (error) {
    console.error("Error in getMealTypeByName:", error.message);
    throw error;
  }
};

// lookup ingredient and return ID

module.exports = {
  getCuisineByName,
  getDietByName,
  getMealTypeByName
};