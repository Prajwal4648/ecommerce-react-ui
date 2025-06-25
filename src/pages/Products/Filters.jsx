import React, { useState } from "react";
import "./Filters.css";

const Filter = ({ onCategoryChange, onSizeChange }) => {
  const categories = [
    "Electronics",
    "Jewelery",
    "Men's clothing",
    "Women's clothing",
  ];
  const sizes = [
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "4Y",
    "6Y",
    "7",
    "8",
    "9",
    "10",
    "11",
    "One Size",
  ];

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);

  const handleCategoryChange = (category, isChecked) => {
    const updated = isChecked
      ? [...selectedCategories, category]
      : selectedCategories.filter((c) => c !== category);
    setSelectedCategories(updated);
    onCategoryChange(updated);
  };

  const handleSizeChange = (size, isChecked) => {
    const updated = isChecked
      ? [...selectedSizes, size]
      : selectedSizes.filter((s) => s !== size);
    setSelectedSizes(updated);
    onSizeChange(updated);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedSizes([]);
    onCategoryChange([]);
    onSizeChange([]);
  };

  return (
    <div className="filter-panel">
      <h2>Filters</h2>

      <div className="filter-section">
        <h3>Categories</h3>
        <div className="filter-options">
          {categories.map((cat) => (
            <div key={cat} className="filter-item">
              <input
                type="checkbox"
                id={`cat-${cat}`}
                checked={selectedCategories.includes(cat)}
                onChange={(e) => handleCategoryChange(cat, e.target.checked)}
              />
              <label htmlFor={`cat-${cat}`}>{cat}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3>Sizes</h3>
        <div className="filter-options">
          {sizes.map((size) => (
            <div key={size} className="filter-item">
              <input
                type="checkbox"
                id={`size-${size}`}
                checked={selectedSizes.includes(size)}
                onChange={(e) => handleSizeChange(size, e.target.checked)}
              />
              <label htmlFor={`size-${size}`}>{size}</label>
            </div>
          ))}
        </div>
      </div>

      <button className="clear-button" onClick={clearFilters}>
        Clear Filters
      </button>
    </div>
  );
};

export default Filter;
