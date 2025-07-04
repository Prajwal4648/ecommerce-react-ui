import React, { useState } from "react";
import "./Filters.css";

const Filter = ({
  onCategoryChange,
  onSizeChange,
  onMinPriceChange,
  onMaxPriceChange,
}) => {
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
  const [minPriceInput, setMinPriceInput] = useState(0);
  const [maxPriceInput, setMaxPriceInput] = useState(500);

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

  const handleMinPriceChange = (e) => {
    const value = Number(e.target.value);
    setMinPriceInput(value);
    onMinPriceChange(value);
  };

  const handleMaxPriceChange = (e) => {
    const value = Number(e.target.value);
    setMaxPriceInput(value);
    onMaxPriceChange(value);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedSizes([]);
    setMinPriceInput(0);
    setMaxPriceInput(500);
    onCategoryChange([]);
    onSizeChange([]);
    onMinPriceChange(0);
    onMaxPriceChange(500);
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

      <div className="filter-section">
        <h3>Price Range</h3>
        <div className="price-range">
          <input
            type="number"
            placeholder="0"
            min="0"
            value={minPriceInput}
            onChange={handleMinPriceChange}
          />
          <span>-</span>
          <input
            type="number"
            placeholder="500"
            min="0"
            value={maxPriceInput}
            onChange={handleMaxPriceChange}
          />
        </div>
      </div>

      <button className="clear-button" onClick={clearFilters}>
        Clear Filters
      </button>
    </div>
  );
};

export default Filter;
