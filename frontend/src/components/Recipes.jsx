import React, { useContext } from 'react';
import { AppDataContext } from '../contexts/AppDataContext'; 

export default function Recipe() {

  //Access recipes from state
  const { state, fetchRecipeInfo } = useContext(AppDataContext);
  const { recipes } = state;
  

  return (
    <div>
      {recipes.length === 0 ? (
        <h1 className="font-bold text-3xl mb-8  text-amber-700 text-center"> No results found! </h1>
      ) : (  

      <section className="md:container max-w-screen-xl mx-auto flex flex-wrap justify-between">
            {recipes && recipes.map(recipe => (
          
          <div key={recipe.id} onClick={()=>fetchRecipeInfo(recipe.id)} className="w-1/4 p-4 mb-4">

            <img src={recipe.image} alt="Regular food" className="mx-auto m-2 w-full h-38 object-cover" />
            <p className="mx-auto max-w-xs text-xs text-center font-bold text-amber-700">{recipe.title}</p>
            
          </div>
        ))}

          </section>
          )} 
    </div>
  )
}
