import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const renderInstructions = (instructions) => {
  const regex = /(<ol>|<\/ol>|<li>|<\/li>|\\n|Instructions)/g;
  const filteredInstructions = instructions.replace(regex, "");
  console.log(filteredInstructions.split("."));
  return filteredInstructions
    .split(".")
    .map((instruction) => <li>{instruction}</li>);
};

const RecipeDetails = function () {
  const { id } = useParams();
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [recipeReviews, setRecipeReviews] = useState([]);

  useEffect(() => {
    const fetchRecipeAndReviews = async function () {
      try {
        // Fetch recipe details
        const recipeResponse = await axios.get(
          `http://localhost:3000/api/recipes/${id}`
        );
        console.log(recipeResponse);
        const recipeData = recipeResponse.data;
        console.log(recipeData);

        // Check if response is ok
        if (recipeResponse.status === 200) {
          setRecipeDetails(recipeData);
        } else {
          console.error("Error fetching recipe:", recipeData);
        }

        // Fetch recipe reviews
        const reviewsResponse = await axios.get(
          `http://localhost:3000/api/recipes/${id}/reviews`
        );
        console.log(reviewsResponse);
        const reviewsData = reviewsResponse.data;
        console.log(reviewsData);

        // Check if response is ok
        if (reviewsResponse.status === 200) {
          setRecipeReviews(reviewsData);
        } else {
          console.error("Error fetching recipe reviews:", recipeData);
        }
      } catch (error) {
        console.error("Error", error.message);
      }
    };

    fetchRecipeAndReviews();
  }, [id]);

  return (
    <>
      {recipeDetails && (
        <div>
          <h1>{recipeDetails.title}</h1>
          <img src={recipeDetails.image} alt="" />
          <p>
            Instructions:
            <ol>{renderInstructions(recipeDetails.instructions)}</ol>
          </p>
          <p>No. of servings: {recipeDetails.number_of_servings}</p>
          <p>Preparation time: {recipeDetails.prep_time} minutes</p>
          <p>Proteins: {recipeDetails.proteins}</p>
          <p>Carbs: {recipeDetails.carbs}</p>
          <p>Fats: {recipeDetails.fats}</p>
        </div>
      )}

      <h3>Reviews</h3>
      {recipeReviews.length !== 0 ? (
        recipeReviews.map((review) => (
          <div key={review.id}>
            <p>{review.rating}</p>
            <p>{review.review}</p>
          </div>
        ))
      ) : (
        <p>There are no reviews</p>
      )}
    </>
  );
};

export default RecipeDetails;
