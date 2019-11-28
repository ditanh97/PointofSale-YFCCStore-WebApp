import React from 'react'
import getFeeds from './data';
import BarChart from './BarChart';

export default class MainDashboard extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        feeds: getFeeds()
      };
    }
  
    render() {
      return (
        <div className="App">
          <BarChart
            data={this.state.feeds[1].data}
            title={this.state.feeds[1].title}
            color="#70CAD1"
          />
        </div>
      );
    }
  