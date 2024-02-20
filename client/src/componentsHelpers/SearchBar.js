import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function SearchBar() {
  const [search, setSearch] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/search?title=${search}`);
    console.log(search);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default SearchBar;