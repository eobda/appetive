import React from "react";
import { Formik, Form, FieldArray } from "formik";

function RecipeForm() {
  const emptyIngredient = {
    quantity: 0,
    name: ""
  }

  /*
  
  NOTE: All Tailwind classNames are TEMPORARY for visual aid only.
  Once page styling is set they can be changed to match the page styling.

  */
  return (
    <Formik
      initialValues={{
        ingredients: [emptyIngredient]
      }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
    {({ values }) => (
     <Form>
        <div className="w-full">
          <label className="block" htmlFor="name">Recipe Name</label>
          <input
            id="name"
            name="name"
            type="text"
            className="border"
            />
        </div>
        <div className="w-full">
          <label className="block" htmlFor="cuisine">Cuisine</label>
          { /* to update with mock data */}
          <select id="diet" name="diet"
          className="border">
            <option value="French">French</option>
            <option value="Jamaican">Jamaican</option>
          </select>
        </div>
        <div className="w-full">
          <label className="block" htmlFor="diet">Diet</label>
          { /* to update with mock data */}
          <select id="diet" name="diet"
          className="border">
            <option value="Keto">Keto</option>
            <option value="Vegetarian">Vegetarian</option>
          </select>
        </div>
        <div className="w-full">
        <label className="block" htmlFor="prep_time">Prep Time</label>
        <input
          id="prep_time"
          name="prep_time"
          type="text"
          className="border"
          />
        </div>

        <div className="w-full">
          <label className="block" htmlFor="ingredient">Ingredients</label>
          <FieldArray name="ingredients">
            {({ push, remove }) => {
              <>
              {values.ingredients.map((_ingredient, index) => {
                return (
                  { /* Ingredient*/ }
                )
              })}
              <button>+</button>
              </>
            }}
          </FieldArray>
        </div>

        <div className="w-full">
          <label className="block" htmlFor="instructions">Instructions</label>
          <textarea
            id="instructions"
            name="instructions"
            className="w-full border"
            />
        </div>
        <div className="w-full">
        <label className="block" htmlFor="tags">Tags</label>
        <input
          id="tags"
          name="tags"
          type="text"
          className="border"
          />
        </div>

        <button className="text-white bg-black" type="submit">Submit</button>
       </Form>
      )}
    </Formik>
  );
};

export default RecipeForm;