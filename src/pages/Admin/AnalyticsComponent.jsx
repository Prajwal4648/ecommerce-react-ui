import React from 'react';
import * as LucideIcons from "lucide-react";
console.log(Object.keys(LucideIcons));
import "./Analytics.css";

const AnalyticsComponent = () => {
  const metrics = [
    { label: 'Conversion Rate', value: '3.2%', trend: '+0.5%', positive: true },
    { label: 'Avg. Order Value', value: '$186.67', trend: '+12.3%', positive: true },
    { label: 'Growth Rate', value: '+12.5%', trend: '+2.1%', positive: true },
    { label: 'Return Rate', value: '2.1%', trend: '-0.3%', positive: true }
  ];

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <h3 className="analytics-title">Analytics Overview</h3>
        <div className="time-selector">
          <select className="time-select">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
            <option>Last year</option>
          </select>
        </div>
      </div>

      <div className="metrics-grid">
        {metrics.map((metric, index) => (
          <div key={index} className="metric-card">
            <div className="metric-header">
              <span className="metric-label">{metric.label}</span>
              <TrendingUp size={16} className={`trend-icon ${metric.positive ? 'positive' : 'negative'}`} />
            </div>
            <div className="metric-value">{metric.value}</div>
            <div className={`metric-trend ${metric.positive ? 'positive' : 'negative'}`}>
              {metric.trend} from last period
            </div>
          </div>
        ))}
      </div>

      <div className="chart-placeholder">
        <div className="chart-header">
          <h4 className="chart-title">Sales Performance</h4>
          <div className="chart-controls">
            <button className="chart-btn active">
              <BarChart3 size={16} />
              Bar Chart
            </button>
            <button className="chart-btn">
              <PieChart size={16} />
              Pie Chart
            </button>
            <button className="chart-btn">
              <Activity size={16} />
              Line Chart
            </button>
          </div>
        </div>
        <div className="chart-content">
          <div className="chart-mock">
            <div className="chart-bars">
              <div className="bar" style={{height: '60%'}}></div>
              <div className="bar" style={{height: '80%'}}></div>
              <div className="bar" style={{height: '45%'}}></div>
              <div className="bar" style={{height: '70%'}}></div>
              <div className="bar" style={{height: '90%'}}></div>
              <div className="bar" style={{height: '65%'}}></div>
              <div className="bar" style={{height: '85%'}}></div>
            </div>
            <div className="chart-labels">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsComponent;
