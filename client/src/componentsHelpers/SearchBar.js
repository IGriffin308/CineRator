import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

/** Search bar for movies 
 * This will be displayed in the NavBar
 * On sumbit, it will redirect to the search page and use the URL query string to search for movies
 * The API will use the query string to search for movies by title, and return a list of 10 movie results
*/
function SearchBar() {
  const [search, setSearch] = useState("");
  const history = useHistory();

  // Submit form and redirect to search page, using URL query string
  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/search?title=${search}`);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{height: "38px"}}>
        <input
          type="text"
          placeholder="Search Movies"
          value={search}
          onChange={handleChange}
          className="search-bar"
          style={{marginTop: '5px'}}
        />
        <button type="submit" className="btn" style={{transform: "translateY(-2px)"}}>Search</button>
      </form>
    </div>
  );
}

export default SearchBar;