import React from 'react';
import { useState, useEffect, useContext, useRef } from 'react';
import CineratorApi from '../api/api';
import Alert from '../common/Alert';
import LoadingSpinner from '../common/LoadingSpinner';


/** Collect all rating data for movie, and calculate averages.
 * This frontend approach is inefficient, and may be better handled by the backend with better engineered database queries.
 */

function ShowAllRateFav( movieId ) {
  const [exists, setExists] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allFavoriteData, setAllFavoriteData] = useState();
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [averageRating, setAverageRating] = useState();

  useEffect(() => {
    const getAllFavorite = async (movieId) => {
      try {
        let res = await CineratorApi.getFavoritesByMovie(movieId);
        console.log("favorites res", res);
        if (res.length > 0) {
          setExists(true);
          console.log("Favorite exists");
          setAllFavoriteData(res);
          await destructureFavoriteData(res);
          setIsLoading(false);
        } else {
          setExists(false);
          console.log("Favorite does not exist");
          setIsLoading(false);
        }
      } catch (errors) {
        console.log("error:", errors);
        setError(errors);
      }
    }
    getAllFavorite(movieId);
  }, [movieId]);

  function destructureFavoriteData(allFavoriteData) {
    let favTotal = 0;
    let ratingSum = 0;
    let ratingTotal = 0;
    allFavoriteData.forEach(({favorite, rating}) => {
      if(favorite) {
        favTotal++;
      }
      if(rating) {
        ratingSum += rating;
        ratingTotal++;
      }
    });
    if (!ratingTotal) {
      setAverageRating(0);
    } else {
      const ratingAverage = Math.round(10 * ratingSum / ratingTotal) / 10;
      setAverageRating(ratingAverage);
    }
    setFavoriteCount(favTotal);
  }


  if (isLoading) {
    return (<LoadingSpinner />);
  }
  if (error) {
    return (<Alert type="danger" messages={error} />);
  }
  return (
    <div className="container row justify-content-between fs-4">
      <span className="col align-self-start">
        <span style={{
          color: '#ff5b71', fontSize: "30px"
        }}>♥</span>
        {favoriteCount}
      </span>
      {/* <span className="col-3"></span>
      <span className="col-3"></span> */}
      <span className="col align-self-end text-end">
        <span style={{ 
            color: '#ffc700', fontSize: "30px"
          }}>★</span>
        {averageRating}
      </span>
    </div>
  );
}

export default ShowAllRateFav;