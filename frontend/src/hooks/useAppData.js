import { useEffect, useState, useReducer } from "react";
import axios from "axios";
import { apiKey, host } from "../config";

// Define action types as constants
const SET_RECIPES = "SET_RECIPES";

//Initial state
export const initialState = {
  recipes: [],
};

//Define the reducer function to update state
export const reducer = (state, action) => {
  switch (action.type) {
    case SET_RECIPES:
      return {
        ...state,
        recipes: action.recipes,
      };
  }
};

const useAppData = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //Dispatch recipes data
  const setRecipes = (data) => {
    dispatch({
      type: SET_RECIPES,
      recipes: data,
    });
  };

  const fetchRecipeInfo = async (recipeId) => {
    
    try {
      let response;

      const options = {
        method: "GET",
        url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipeId}/information`,
        params: {
          includeNutrition: "true",
        },
        headers: {
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": host,
        },
      };

      // Make the API request
      if (recipeId >= 5) {
        response = await axios.request(options);
        console.log("apiResponse: ", response.data);
      } else {
        response = await axios.get(
          `http://localhost:8080/api/recipes/${recipeId}`
        );
      }

      
      // Extract only necessary information from each recipe

       const extractRecipeInfo = response.data.map((recipe) => ({
          id: recipe.id,
          title: recipe.title,
          image: recipe.image,
          cuisines: recipe.cuisines,
          diets: recipe.diets,
          type: recipe.dishTypes,
          servings: recipe.servings,
          readyInMinutes: recipe.readyInMinutes,
          ingredients: recipe.extendedIngredients,
          nutrients: recipe.nutrition.nutrients,
          instructions: recipe.instructions,
          sourceName: recipe.sourceName,
        }))
      return extractRecipeInfo;
    }
    catch (error) {
      console.error("Error fetching recipe information: ", error);
    }
  }
                  

  //Fetch all recipes from api on initial render
  useEffect(() => {
  
    const fetchRecipes = async () => {
      const apiOptions = {
        method: "GET",
        url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch",
        params: {
          number: '100'
        },
        headers: {
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": host
        },
      };

      try {
        // Fetch recipes from API
        const apiResponse = await axios.request(apiOptions);
        const apiRecipes = apiResponse.data.results;

        // Fetch recipes from database
        const dbResponse = await axios.get("http://localhost:8080/api/recipes");
        const dbRecipes = dbResponse.data;

        // Merge API and database recipes
        const allRecipes = [...dbRecipes,...apiRecipes];

        setRecipes(allRecipes);

      } catch (error) {
        console.error("Error fetching recipes: ", error);
      }
    };
    fetchRecipes();
  }, []);


  // Function to handle search form submission and make API call
  const handleSearchSubmission = async (values) => {
    // Store selected options for each category. Convert minCalories and maxCalories to arrays with a single element

    const selectedOptions = {
      cuisine: values.cuisine,
      type: values.type,
      diet: values.diet.join(","),
      intolerances: values.intolerances.join(","),
      minCalories: values.minCalories,
      maxCalories: values.maxCalories
    };

    // Remove keys with empty values
  const filteredOptions = Object.fromEntries(
    Object.entries(selectedOptions).filter(([key, value]) => value !== "")
  );
    
    console.log("filtered options: ", filteredOptions);

    const options = {
      method: "GET",
      url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?number=2",
      params: filteredOptions,
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": host,
      },
    };
    try {
      const response = await axios.request(options);

      // console.log("search response: ", response.data);
      // const filteredRecipes = await Promise.all(
      //   response.data.results.map((recipe) => fetchRecipeInfo(recipe.id))
      // );

      // // console.log("Filtered Results: ", filteredRecipes);
      // setRecipes(filteredRecipes);
    } catch (error) {
      console.error("Error fetching filtered recipes: ", error);
    }
  };
  return {
    state,
    handleSearchSubmission,
    fetchRecipeInfo,
    setRecipes
  };
};

export default useAppData;
