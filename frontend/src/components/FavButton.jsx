import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import useAuthentication from "../hooks/useAuthentication";

export default function FavButton (props) {
  const { isAuthenticated } = useAuthentication();

  const [ isFav, setIsFav ] = useState(false);
  const jwtToken = localStorage.token;
  const recipe_id = props.recipe_id;

  useEffect(() => {
    const getFavStatus = async (recipe_id) => {
      try {
        const response = await axios.get(`http://localhost:8080/api/user/recipe/${recipe_id}`, {
          headers: { token: jwtToken }
        });
        const favCheck = response.data;

        setIsFav(favCheck);
      } catch (error) {
        console.error("Error getting fav status:", error);
      }
    }
    getFavStatus(recipe_id);
  }, [isFav]);

  const handleFavClick = async (token, recipe_id) => {
    try {
      const response = await axios.post(`http://localhost:8080/api/user/recipe/${recipe_id}/fav`, {
        token,
        recipe_id
      });
      
      setIsFav(response.data);
    } catch (error) {
      console.error("Error changing fav status:", error);
    }
  };

  return (
    <div>
    {!isAuthenticated && (
      <section className="flex border border-black h-10 px-8 justify-center w-[220px] opacity-50 pointer-events-none">
        <p className="flex items-center">
          <FaHeart />
          <button className="ml-2">Add to Favourites</button>
        </p>
      </section>
    )}
    {isAuthenticated && !isFav && (
      <section className="flex border border-black h-10 px-8 justify-center w-[220px]" onClick={() => {handleFavClick(jwtToken, recipe_id)}}>
        <p className="flex items-center">
          <FaHeart />
          <button className="ml-2">Add to Favourites</button>
        </p>
      </section>
    )}
    {isAuthenticated && isFav && (
      <section className="flex border border-black h-10 px-8 justify-center bg-yellow w-[220px]" onClick={() => {handleFavClick(jwtToken, recipe_id)}}>
        <p className="flex items-center">
          <FaHeart />
          <button className="ml-2">Favourite</button>
        </p>
      </section>
    )}
    </div>
  )
};