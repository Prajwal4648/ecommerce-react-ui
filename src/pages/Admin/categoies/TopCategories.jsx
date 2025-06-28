import React from 'react';
import './TopCategories.css';

const TopCategories = () => {
  const categories = [
    { name: "Men's Clothing", percentage: 45, color: '#3b82f6' },
    { name: "Women's Clothing", percentage: 35, color: '#10b981' },
    { name: 'Accessories', percentage: 15, color: '#f59e0b' },
    { name: 'Kids', percentage: 5, color: '#8b5cf6' }
  ];

  return (
    <div className="top-categories">
      <h3 className="categories-title">Top Categories</h3>
      <div className="categories-list">
        {categories.map((category, index) => (
          <div key={index} className="category-item">
            <div className="category-info">
              <div 
                className="category-indicator" 
                style={{ backgroundColor: category.color }}
              ></div>
              <span className="category-name">{category.name}</span>
            </div>
            <div className="category-percentage">
              <span className="percentage-text">{category.percentage}%</span>
              <div className="percentage-bar">
                <div 
                  className="percentage-fill" 
                  style={{ 
                    width: `${category.percentage}%`,
                    backgroundColor: category.color
                  }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCategories;