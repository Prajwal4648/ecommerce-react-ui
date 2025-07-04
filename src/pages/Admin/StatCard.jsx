// src/components/StatCard.jsx  (or wherever the file lives)
import React from "react";
import "./StatCard.css";

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="admin-stat-card">
    {/* ① title row */}
    <span className="admin-stat-label">{title}</span>

    {/* ② value + icon row */}
    <div className="admin-stat-body">
      <span className="admin-stat-value">{value}</span>
      <Icon size={24} className="admin-stat-icon" style={{ color }} />
    </div>
  </div>
);

export default StatCard;
