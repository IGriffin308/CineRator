import React from 'react';
import MovieFull from '../componentsHelpers/MovieFull';

function MoviePage({ movieId }) {

  return (
    <div>
      <MovieFull movieId={ movieId }/>
    </div>
  );
}  

export default MoviePage;