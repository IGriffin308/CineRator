import React, { useState, useEffect } from 'react';
import RateFav from './RateFav';
import CineratorApi from "../api/api";
import Alert from "../common/Alert";
import LoadingSpinner from "../common/LoadingSpinner";
import ShowAllRateFav from "./ShowAllRateFav";


/** Show movie details in full for movie page*/
function MoviePlaque({ movieId }) {
  const [isLoading, setIsLoading] = useState(true);
  const [movieArr, setMovieArr] = useState([{}]);
  const [error, setError] = useState(null);

  // Get movie details by movie ID from API, then parse data to an array for easier maping.
  useEffect(() => {
    async function getMovieById(movieId) {
      try {
        let movie = await CineratorApi.getMovieById(movieId);
        let movieArr = Object.values(movie);
        setMovieArr(movieArr);
        setIsLoading(false);
      } catch (errors) {
        console.error("get failed", errors);
        setError(errors);
        setIsLoading(false);
      }
    }
    getMovieById(movieId)
  }, [movieId]);



  if (isLoading) {
    return (<LoadingSpinner />);
  }
  if (error) {
    return (<Alert type="danger" messages={error} />);
  }
  if (movieArr === undefined || movieArr.length === 0) {
    return (
      <Alert type="danger" messages={["No Movie Found"]} />
    );
  }

    return (
      <div className="container border border-dark rounded">
        <div className="container">
          <h1>{movieArr[0]}</h1> {/*this is the title*/}
          <ShowAllRateFav movieId={movieId} />
          <div className="row">
            <div className="col-lg">
              <img 
                src={movieArr[13]}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src="https://fakeimg.pl/300x500";
                }}
                alt="movie poster"
                style={{
                  width: "70vw",
                  maxWidth: "390px",
                  height: "auto",
                  aspectRatio: "auto",
                  padding: "10px",
                  position: "relative", 
                  left: "50%", 
                  transform: "translateX(-50%)"
                }}
              /> {/*this is the poster*/}
            </div>
            <div 
              className="container border border-dark rounded col-lg"
              style={{margin: '10px', padding: '10px', background: 'rgba(255,255,255,0.5)'}}
            >
              <p>Plot: {movieArr[9]}</p> {/*this is the plot*/}
              <p>Director: {movieArr[6]}</p> {/*this is the director*/}
              <p>Cast: {movieArr[8]}</p> {/*this is the cast*/}
              <p>Genre: {movieArr[5]}</p> {/*this is the genre*/}
              <p>Rated: {movieArr[2]}</p> {/*this is the rating*/}
              <p>Released: {movieArr[3]}</p> {/*this is the release date*/}
              <p>Runtime: {movieArr[4]}</p> {/*this is the runtime*/}
            </div>
          </div>
        </div>
      </div>
    );
}

export default MoviePlaque;