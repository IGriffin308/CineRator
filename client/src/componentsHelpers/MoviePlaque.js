import React, { useState, useEffect } from 'react';
import RateFav from './RateFav';
import CineratorApi from "../api/api";
import testmovie1 from "../testmovie1";
// import { use } from '../../../server/routes/omdb';


function MoviePlaque({ title }) {
  const [isLoading, setIsLoading] = useState(true);
  const [movieArr, setMovieArr] = useState([{}]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getMovieByTitle(title) {
      try {
        let movie = await CineratorApi.getMovieByTitle(title);
        let movieArr = Object.values(movie);
        console.log(movie);
        console.log(movieArr);
        setMovieArr(movieArr);
        setIsLoading(false);
        // return movieArr;
      } catch (errors) {
        console.error("get failed", errors);
        setError(errors);
        setIsLoading(false);
        // return { success: false, errors };
      }
    }
    getMovieByTitle(title)
  }, [title]);



  if (isLoading) {
    return (<p>Loading...</p>);
  }
  if (error) {
    return (<p>Something went wrong: {error.message}</p>);
  }
    return (
      <div className="container border border-dark rounded">
        <div className="container">
          <h2>{movieArr[0]}</h2> {/*this is the title*/}
          <div className="container">
            <RateFav title={title}/>
          </div>
          <img 
            src={movieArr[13]}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src="https://fakeimg.pl/400x600";
            }}
            alt="movie poster"
            style={{width: "400px", position: "relative", left: "50%", transform: "translateX(-50%)"}}
          /> {/*this is the poster*/}
          <div 
            className="container border border-dark rounded"
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
    );
}

export default MoviePlaque;