import React from 'react';
import SearchPlaque from '../componentsHelpers/SearchPlaque';

function Searchpage({ title }) {
  return (
    <div>
      <h2>Search Results for: "{title}"</h2>
      <SearchPlaque title={ title } />
    </div>
  );
}

export default Searchpage;