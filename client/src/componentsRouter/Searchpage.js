import React from 'react';
import MoviePlaque from '../componentsHelpers/MoviePlaque';

function Searchpage({ title }) {
  return (
    <div>
      <h1>Searchpage</h1>
      <h2>{title}</h2>
      <MoviePlaque title={ title } />
    </div>
  );
}

export default Searchpage;