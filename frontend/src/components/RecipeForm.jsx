import React from "react";
import { Formik, Form, FieldArray, Field } from "formik";
import axios from "axios";

function RecipeForm() {
  const emptyIngredient = {
    measurement: "",
    name: ""
  }

  // All Tailwind classNames are TEMPORARY to make the form easier to look at. All can be altered at styling stage
  return (
    <Formik
      initialValues={{
        title: '',
        image: '',
        prep_time: 0,
        ingredients: [emptyIngredient],
        instructions: '',
        proteins: '',
        fats: '',
        carbs: '',
        number_of_servings: 0,
        calories: 0,
        cuisine: '',
        diet: '',
        meal_type: '',
        intolerances: ''
      }}
      onSubmit={(values) => {
        axios.post('http://localhost:8080/api/recipes/', values);
      }}
    >
    {({ values, handleChange, setFieldValue }) => (
      <Form>

      <label className="block" htmlFor="title">Recipe Title</label>
      <Field
        id="title"
        name="title"
        type="text"
        value={values.title}
        onChange={handleChange}
        className="border"
        />

      <label className="block" htmlFor="cuisine">Cuisine</label>
      <Field
        as="select"
        id="cuisine"
        name="cuisine"
        value={values.cuisine}
        onChange={handleChange}
        className="border"
      >
        <option value="African">African</option>
        <option value="Asian">Asian</option>
        <option value="American">American</option>
        <option value="British">British</option>
        <option value="Cajun">Cajun</option>
        <option value="Caribbean">Caribbean</option>
        <option value="Chinese">Chinese</option>
        <option value="Eastern European">Eastern European</option>
        <option value="European">European</option>
        <option value="French">French</option>
        <option value="German">German</option>
        <option value="Greek">Greek</option>
        <option value="Indian">Indian</option>
        <option value="Irish">Irish</option>
        <option value="Italian">Italian</option>
        <option value="Japanese">Japanese</option>
        <option value="Jewish">Jewish</option>
        <option value="Korean">Korean</option>
        <option value="Latin American">Latin American</option>
        <option value="Mediterranean">Mediterranean</option>
        <option value="Mexican">Mexican</option>
        <option value="Middle Eastern">Middle Eastern</option>
        <option value="Nordic">Nordic</option>
        <option value="Southern">Southern</option>
        <option value="Spanish">Spanish</option>
        <option value="Thai">Thai</option>
        <option value="Vietnamese">Vietnamese</option>
      </Field>

      <fieldset>
        <legend>Dietary Restrictions</legend>

        <label htmlFor="diet">Diet</label>
        <Field
          as="select"
          id="diet"
          name="diet"
          value={values.diet}
          onChange={handleChange}
          className="border"
        >
          <option value="NULL">None</option>
          <option value="Gluten Free">Gluten Free</option>
          <option value="Ketogenic">Ketogenic</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Lacto-Vegetarian">Lacto-Vegetarian</option>
          <option value="Ovo-Vegetarian">Ovo-Vegetarian</option>
          <option value="Vegan">Vegan</option>
          <option value="Pescetarian">Pescetarian</option>
          <option value="Paleo">Paleo</option>
          <option value="Primal">Primal</option>
          <option value="Low FODMAP">Low FODMAP</option>
          <option value="Whole30">Whole30</option>
        </Field>

        <label htmlFor="intolerances">Intolerances</label>
        <Field
          as="select"
          id="intolerances"
          name="intolerances"
          value={values.intolerances}
          onChange={handleChange}
          className="border"
          >
          <option value="NULL">None</option>
          <option value="Dairy">Dairy</option>
          <option value="Egg">Egg</option>
          <option value="Gluten">Gluten</option>
          <option value="Grain">Grain</option>
          <option value="Peanut">Peanut</option>
          <option value="Seafood">Seafood</option>
          <option value="Sesame">Sesame</option>
          <option value="Shellfish">Shellfish</option>
          <option value="Soy">Soy</option>
          <option value="Sulfite">Sulfite</option>
          <option value="Tree Nut">Tree Nut</option>
          <option value="Wheat">Wheat</option>
        </Field>
      </fieldset>

      <label className="block" htmlFor="meal_type">Meal Type</label>
      <Field
        as="select"
        id="meal_type"
        name="meal_type"
        value={values.meal_type}
        onChange={handleChange}
        className="border"
      >
        <option value="main course">main course</option>
        <option value="side dish">side dish</option>
        <option value="dessert">dessert</option>
        <option value="appetizer">appetizer</option>
        <option value="salad">salad</option>
        <option value="bread">bread</option>
        <option value="breakfast">breakfast</option>
        <option value="soup">soup</option>
        <option value="beverage">beverage</option>
        <option value="sauce">sauce</option>
        <option value="marinade">marinade</option>
        <option value="fingerfood">fingerfood</option>
        <option value="snack">snack</option>
        <option value="drink">drink</option>
      </Field>

      <label className="block" htmlFor="prep_time">Prep Time</label>
      <Field
        id="prep_time"
        name="prep_time"
        type="number"
        value={values.prep_time}
        onChange={handleChange}
        className="border"
        /> minutes

      <label className="block" htmlFor="number_of_servings">Number of Servings</label>
      <Field
        id="number_of_servings"
        name="number_of_servings"
        type="number"
        value={values.number_of_servings}
        onChange={handleChange}
        className="border"
      />

      <label className="block" htmlFor="ingredients">Ingredients</label>
      <FieldArray name="ingredients">
        {({ push, remove }) => (
          <>
            {values.ingredients.map((ingredient, index) => {
              const startName = `ingredients[${index.toString()}]`;

              return (
                <div key={`ingredient-${index.toString()}`}>
                  <Field
                    name={`${startName}.measurement`}
                    type="text"
                    placeholder="50g"
                    value={values.ingredients[index].measurement}
                    onChange={handleChange}
                    className="border"
                  />
                  <Field
                    name={`${startName}.name`}
                    type="text"
                    placeholder="carrots"
                    value={values.ingredients[index].name}
                    onChange={handleChange}
                    className="border"
                  />
                  <button
                    type="button"
                    onClick={() => push(emptyIngredient)}
                    className="mx-1 px-2 bg-gray-200"
                  >Add</button>
                  {index > 0 && <button
                    type="button"
                    onClick={() => remove(index)}
                    className="mx-1 px-2 bg-gray-200"
                  >Remove</button>}
                </div>
              )
            })}
          </>
        )}
      </FieldArray>

      <label className="block" htmlFor="instructions">Instructions</label>
      <Field as="textarea"
        id="instructions"
        name="instructions"
        value={values.instructions}
        onChange={handleChange}
        className="border"
      />

      <fieldset>
        <legend>Nutritional Information</legend>

        <label className="inline" htmlFor="proteins">Protein</label>
        <Field
          id="proteins"
          name="proteins"
          type="text"
          value={values.proteins}
          onChange={handleChange}
          className="border"
          />
        <label className="inline" htmlFor="fats">Fats</label>
        <Field
          id="fats"
          name="fats"
          type="text"
          value={values.fats}
          onChange={handleChange}
          className="border"
          />
        <label className="inline" htmlFor="carbs">Carbs</label>
        <Field
          id="carbs"
          name="carbs"
          type="text"
          value={values.carbs}
          onChange={handleChange}
          className="border"
          />
        
        <br />

        <label className="inline" htmlFor="calories">Calories</label>
        <Field
          id="calories"
          name="calories"
          type="number"
          value={values.calories}
          onChange={handleChange}
          className="border"
          />
      </fieldset>

      <label className="block" htmlFor="image">Upload Image</label>
      <input
        id="image"
        name="image"
        type="file"
        value={values.image}
        onChange={(event) => {
          setFieldValue("file", event.currentTarget.files[0]);
        }}
        className="border"
        />
        <div>
          <button
            type="submit"
            className="px-2 bg-gray-200"
          >
              Submit Recipe
          </button>
        </div>
      </Form>
    )}
    </Formik>
  );
};

export default RecipeForm;