import React from "react";
import "./SearchBar.css";

const Search = ({ onSearchChange }) => {
  return (
    <div className="search-box">
      <label>
        <strong>Search</strong>
      </label>
      <input
        type="text"
        id="search"
        placeholder="Search products..."
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default Search;
