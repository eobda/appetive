import React, { useContext, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { AppDataContext } from '../contexts/AppDataContext';



const cuisine = ['African', 'Asian', 'American', 'British', 'Cajun', 'Caribbean', 'Chinese', 'Eastern European', 'European', 'French', 'German', 'Greek', 'Indian', 'Irish', 'Italian', 'Japanese', 'Jewish', 'Korean','Latin American', 'Mediterranean', 'Mexican', 'Middle Eastern', 'Nordic', 'Southern', 'Spanish', 'Thai', 'Vietnamese'];

const intolerances = ['Dairy', 'Egg', 'Gluten', 'Grain', 'Peanut', 'Seafood', 'Sesame', 'Shellfish', 'Soy', 'Sulfite', 'Tree Nut', 'Wheat'];

const diet = ['Ketogenic', 'Vegetarian', 'Lacto-Vegetarian', 'Ovo-Vegetarian', 'Vegan', 'Pescetarian', 'Paleo', 'Primal', 'Low FODMAP', 'Whole30'];

const type = ['main course', 'side dish', 'dessert', 'appetizer', 'salad', 'bread', 'breakfast', 'soup', 'beverage', 'sauce', 'marinade', 'fingerfood', 'snack', 'drink'];

const calories = ["< 300", "300 - 499", "500 - 699", "700 - 1000", "> 1000"]


export default function SearchForm() {

  //Access the handleSearchSubmission function
  const { handleSearchSubmission } = useContext(AppDataContext);
  
  const [question, setQuestion] = useState(1);

  const initialValues={
    cuisine: [],
    type: [],
    diet: [],
    intolerances: [],
    calories: []
  }

  const handleNextQuestion = () => {
    setQuestion(question + 1);
  };

  const handlePrevQuestion = () => {
    setQuestion(question - 1);
  };

  const renderMultiselectOptions = (fieldName, optionsArray, showBackButton, handleChange, values) => {
    return (
      <>
      <div className="max-w-screen-xl mx-auto flex justify-center">
      <div className="max-w-screen-md w-full grid grid-cols-4 gap-4 md:grid-cols-4">
        {optionsArray.map(option => (
          <div key={option} className="flex items-center">
            <label className="flex items-center space-x-2">
              <Field
                type="checkbox"
                name={fieldName}
                value={option}
                checked={values[fieldName].includes(option)}
                onChange={handleChange}
                className="form-checkbox h-5 w-5 text-gray-600"
              />
              <span className="ml-2">{option}</span>
            </label>
          </div>
        ))}
          </div>
          </div>
        <div className="flex justify-center mt-16 mb-16">
          {showBackButton && <button type="button" onClick={handlePrevQuestion} className="hover:bg-amber-200 border-2 border-amber-700 text-black font-bold py-1 px-10 rounded-full mr-4">Back</button>}
          {question < 5 && <button type="button" onClick={handleNextQuestion} className="bg-amber-600 hover:bg-amber-700 text-black font-bold py-1 px-10 rounded-full mr-4">Next</button>}
          {question === 5 && <button type="submit" className="bg-amber-600 hover:bg-amber-700 text-black font-bold py-1 px-10 rounded-full mr-4">Search</button>}
        </div>
        </>
    ); 
  };

   const renderSingleselectOptions = (fieldName, optionsArray, showBackButton, handleChange, values) => {
    return (
      <>
      <div className="max-w-screen-xl mx-auto flex justify-center">
      <div className="max-w-screen-md w-full grid grid-cols-4 gap-4 md:grid-cols-4">
        {optionsArray.map(option => (
          <div key={option} className="flex items-center">
            <label className="flex items-center space-x-2">
              <Field
                type="radio"
                name={fieldName}
                value={option}
                checked={values[fieldName].includes(option)}
                onChange={handleChange}
                className="form-radio h-5 w-5 text-gray-600"
              />
              <span className="ml-2">{option}</span>
            </label>
          </div>
        ))}
          </div>
          </div>
        <div className="flex justify-center mt-16 mb-16">
          {showBackButton && <button type="button" onClick={handlePrevQuestion} className="hover:bg-amber-200 border-2 border-amber-700 text-black font-bold py-1 px-10 rounded-full mr-4">Back</button>}
          {question < 5 && <button type="button" onClick={handleNextQuestion} className="bg-amber-600 hover:bg-amber-700 text-black font-bold py-1 px-10 rounded-full mr-4">Next</button>}
          {question === 5 && <button type="submit" className="bg-amber-600 hover:bg-amber-700 text-black font-bold py-1 px-10 rounded-full mr-4">Search</button>}
        </div>
        </>
    ); 
  };

  
  return (
    
    <Formik
      
      initialValues={initialValues}

      onSubmit={(values, actions) => {
        //Handle form submission
        console.log(values);
        handleSearchSubmission(values);
        actions.setSubmitting(false);
      }}
    >
      {({ handleSubmit, handleChange, values }) => (
        <Form onSubmit={handleSubmit}>

          <p className='text-xs mb-4 uppercase font-serif text-gray-500 text-center'>Personalize your search</p>

          {question === 1 &&
            <>
            <h1 className="font-bold text-3xl mb-8  text-amber-700 text-center">Which type of cuisine are you most interested in?</h1>
            {renderSingleselectOptions("cuisine", cuisine, false, handleChange, values)}
            
            </>
          }

          {question === 2 &&
            <>
            <h1 className="font-bold text-3xl mb-8  text-amber-700 text-center">What kind of meal would you like to prepare?</h1>
            {renderSingleselectOptions("type", type, true, handleChange, values)}
            </>
          }

          {question === 3 &&
            <>
            <h1 className="font-bold text-3xl mb-8  text-amber-700 text-center">Do you have any specific dietary preferences?</h1>
            {renderMultiselectOptions("diet", diet, true, handleChange, values)}
            </>
          }

          {question === 4 &&
            <>
            <h1 className="font-bold text-3xl mb-8  text-amber-700 text-center">Are there any food allergies you need to consider?</h1>
            {renderMultiselectOptions("intolerances", intolerances, true, handleChange, values)}
            </>
          }

          {question === 5 &&
            <>
            <h1 className="font-bold text-3xl mb-8  text-amber-700 text-center">What calorie range would you like your meals to fall within?</h1>
            {renderMultiselectOptions("calories", calories, true, handleChange, values)}
            </>
          }
           
        </Form>
      )}

    </Formik>
    
  );
};

