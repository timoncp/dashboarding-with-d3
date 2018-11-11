import React from 'react';

import LineChart from '../Core/LineChart';

import './Dashboard.css';

const data = [
  { x: 0, y: 8.5 },
  { x: 1, y: 8.5 },
  { x: 2, y: 8.7 },
  { x: 3, y: 8.5 },
  { x: 4, y: 8.2 },
  { x: 5, y: 5.0 },
  { x: 6, y: 6.5 },
  { x: 7, y: 5.5 },
  { x: 8, y: 4.7 },
  { x: 9, y: 8.5 },
  { x: 10, y: 9.5 },
];

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <h2>Dashboard</h2>
        <LineChart data={data} />
      </div>
    );
  }
};

export default Dashboard;
