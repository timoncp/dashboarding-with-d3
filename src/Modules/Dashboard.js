import React from 'react';

import LineChart from '../Core/LineChart';

import './Dashboard.css';

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <h2>Dashboard</h2>
        <LineChart />
      </div>
    );
  }
};

export default Dashboard;
