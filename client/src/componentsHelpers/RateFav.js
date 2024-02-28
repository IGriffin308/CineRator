import React from 'react';
import { useState, useEffect, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import './RateFav.css';
import UserContext from "../auth/UserContext";
import CineratorApi from '../api/api';
import Alert from '../common/Alert';
import LoadingSpinner from '../common/LoadingSpinner';

function RateFav({ movieId }) {
  const history = useHistory();
  const [exists, setExists] = useState(false);
  const { currentUser } = useContext(UserContext);
  // this component will only render if the user is logged in
  if (!currentUser) {
    history.push("/login");
  }
  const userId = (currentUser.id || 0);


  const [favoriteData, setFavoriteData] = useState({
    user_id: userId,
    movie_id: movieId,
    rating: null,
    favorite: false
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const getFavorite = async (userId, movieId) => {
      try {
        let res = await CineratorApi.getFavorite(userId, movieId);
        console.log("favorites res", res);
        if (res.length > 0) {
          setExists(true);
          console.log("Favorite exists");
          setFavoriteData(res[0]);
          console.log ("favoriteData", favoriteData);
        } else {
          setExists(false);
          console.log("Favorite does not exist");
        }
        setIsLoading(false);
      } catch (errors) {
        console.log("error:", errors);
        setError(errors);
      }
    }
    getFavorite(userId, movieId);
  }, [userId, movieId]);


  /** This function will handle whether to update or post new favorite data to prevent duplicate entries.
   * There is also handling on the backend to prevent duplicate entries.
   */

  async function handlePostOrUpdateFavorite() {
    if (exists) {
      console.log("exists");
      await CineratorApi.editFavorite(
        userId,
        movieId,
        favoriteData
      );
    } else {
      console.log("does not exist");
      await CineratorApi.addFavorite(favoriteData);
      setExists(true);
    }
    console.log(favoriteData);
  }


  /** These two functions handle updating the state of the Rating and Favorite toggles.
   * They will sync with the backend to update the database in real time as the user interacts with the page.
   * This is a more efficient approach than waiting for the user to submit a form.
   * 
   * An unusual approach is taken to ensure the state data is updated in time to be sent to the backend, 
   *    as well as update the UI in real time.
   */

  const handleCheckboxChange = async (e) => {
    // This updates the state quickly enough to be sent to the backend, but does not update the UI.
    favoriteData.favorite = e.target.checked;
    // This updates the state too slowly to be sent to the backend, but updates the UI.
    setFavoriteData({ ...favoriteData, favorite: e.target.checked });
    // This handles the backend update.
    handlePostOrUpdateFavorite();
  }

  const handleRadioChange = async (e) => {
    // This updates the state quickly enough to be sent to the backend, but does not update the UI.
    favoriteData.rating = parseInt(e.target.value);
    // This updates the state too slowly to be sent to the backend, but updates the UI.
    setFavoriteData({ ...favoriteData, rating: parseInt(e.target.value) });
    // This handles the backend update.
    handlePostOrUpdateFavorite();
  }


  if (isLoading) {
    return (<LoadingSpinner />);
  }
  if (error) {
    return (<Alert type="danger" messages={error} />);
  }
  return (
    <div className="container border border-dark rounded">
    {/* <form onSubmit={handlePostOrUpdateFavorite}> */}
    <form>
      <span className="fav">
        <input type="checkbox" id="fav" name="fav" value="fav" 
          checked={favoriteData.favorite} 
          onChange={handleCheckboxChange}
        />
          <label htmlFor="fav" title="text">Favorite</label>
      </span>
      <span className="rate">
        <input type="radio" id="star5" name="rate" value="5"
          checked={favoriteData.rating === 5} 
          onChange={handleRadioChange}
        />
          <label htmlFor="star5" title="text">5 stars</label>
        <input type="radio" id="star4" name="rate" value="4" 
          checked={favoriteData.rating === 4} 
          onChange={handleRadioChange}
        />
          <label htmlFor="star4" title="text">4 stars</label>
        <input type="radio" id="star3" name="rate" value="3" 
          checked={favoriteData.rating === 3} 
          onChange={handleRadioChange}
        />
          <label htmlFor="star3" title="text">3 stars</label>
        <input type="radio" id="star2" name="rate" value="2" 
          checked={favoriteData.rating === 2} 
          onChange={handleRadioChange}
        />
          <label htmlFor="star2" title="text">2 stars</label>
        <input type="radio" id="star1" name="rate" value="1"
          checked={favoriteData.rating === 1} 
          onChange={handleRadioChange}
        />
          <label htmlFor="star1" title="text">1 star</label>
      </span>
      <br />
      {/* <input type="submit" value="Submit" /> */}
      <br />
    </form>
    </div>
  );
}

export default RateFav;


// useEffect(( title ) => {
//   const getMovie = async () => {
//     let res = await CineratorApi.getMovieByTitle(title);
//     setMovieId(res.id);
//     movieArr = Object.values(res);
//     if (res) {
//       let existRes = await CineratorApi.checkIfCommentExists(currentUser.id, res.id)
//       setExists(existRes.exists);
//       if (existRes.exists) {
//         console.log("Comment exists");
//         setCommentId(existRes.commentId);
//       }
//     }
//   }
//   getMovie();
// }, [title]);

// const handleSubmit = (e) => {
//   e.preventDefault();
//   if (exists) {
//     console.log("exists");
//     CineratorApi.editComment(
//       commentId,
//       data = {
//         comment: comment,
//       });
//   }
//   CineratorApi.addComment(
//     // [ movieArr[18], comment ]
//     // id = movieId,
//     data = {
//       // 1, // user_id
//       user_id: currentUser.id, // user_id
//       // movieArr[18], // movie_id
//       movie_id: movieId, // movie_id
//       comment: comment, // comment
//       // null, // rating
//       // false, // favorite
//     });
//   console.log(comment);
// }