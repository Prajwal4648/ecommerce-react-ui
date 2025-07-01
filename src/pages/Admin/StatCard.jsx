import React from 'react';
import './StatCard.css';

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="stat-card">
    <div className="stat-header">
      <span className="stat-label">{title}</span>
      <Icon size={24} style={{ color }} />
    </div>
    <div className="stat-value">{value}</div>
  </div>
);

export default StatCard;