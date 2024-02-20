import React from 'react';
import MovieFull from '../componentsHelpers/MovieFull';
import MoviePlaque from '../componentsHelpers/MoviePlaque';

function MoviePage({ title }) {

  return (
    <div>
      <h1>Movie Page</h1>
      <h2>{title}</h2>
    </div>
  );
}  

export default MoviePage;