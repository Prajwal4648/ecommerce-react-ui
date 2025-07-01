import React from 'react';
import './SalesOverview.css';

const SalesOverview = () => {
  const salesData = [
    { period: "Today's Sales", amount: '$560', color: '#3b82f6' },
    { period: 'This Week', amount: '$2,340', color: '#10b981' },
    { period: 'This Month', amount: '$8,920', color: '#f59e0b' },
    { period: 'This Year', amount: '$89,450', color: '#8b5cf6' }
  ];

  return (
    <div className="sales-overview">
      <h3 className="sales-title">Sales Overview</h3>
      <div className="sales-list">
        {salesData.map((item, index) => (
          <div key={index} className="sales-item">
            <div className="sales-period">
              <div 
                className="period-indicator" 
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="period-label">{item.period}</span>
            </div>
            <span className="sales-amount">{item.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesOverview;