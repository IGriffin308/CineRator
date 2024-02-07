import React from 'react';
import RateFav from './RateFav';

function MoviePlaque() {
  return (
    <div className="container border border-dark rounded">
      <div className="container">
        <h2>Movie Title</h2>
        <div className="container">
          <RateFav />
        </div>
        <img src="https://via.placeholder.com/150" alt="movie poster" />
        <p>Movie Description Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
    </div>
  );
}

export default MoviePlaque;