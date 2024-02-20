import React from 'react';
import './RateFav.css';

function RateFav({ title }) {
  return (
    <div className="container border border-dark rounded">
      <span className="fav">
        <input type="checkbox" id="fav" name="fav" value="fav" />
          <label htmlFor="fav" title="text">Favorite</label>
      </span>
      <span className="rate">
        <input type="radio" id="star5" name="rate" value="5" />
          <label htmlFor="star5" title="text">5 stars</label>
        <input type="radio" id="star4" name="rate" value="4" />
          <label htmlFor="star4" title="text">4 stars</label>
        <input type="radio" id="star3" name="rate" value="3" />
          <label htmlFor="star3" title="text">3 stars</label>
        <input type="radio" id="star2" name="rate" value="2" />
          <label htmlFor="star2" title="text">2 stars</label>
        <input type="radio" id="star1" name="rate" value="1" />
          <label htmlFor="star1" title="text">1 star</label>
      </span>
      <br />
      <br />
    </div>
  );
}

export default RateFav;