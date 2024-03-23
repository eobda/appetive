const authorization = require("../middleware/authorization");
const router = require("express").Router();
const { getReviewsByRecipeId, addReview } = require("../db/queries/reviews")

// Get review
router.get("/:id", async (req, res) => {
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

// Add a review
router.post("/:id", authorization, async (req, res) => {
  const recipeId = req.params.id;
  const newReview = req.body;
  newReview.user_id = req.user;
  try {
    const result = await addReview(
      recipeId,
      newReview.rating,
      newReview.review,
      newReview.user_id
    );
    console.log("Review added", result.rows);
    res.status(201).send(newReview);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

//Delete a review


module.exports = router;

