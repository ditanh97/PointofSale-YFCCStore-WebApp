import React from 'react';
import Chart from 'chart.js'

export default class BarChart extends React.Component {
    constructor(props) {
        super(props);
        this.chartRef = React.createRef();  //using createRef() API introduced in React 16.3
    }

    //instantiates Chart.js bar chart
    componentDidMount() {
        this.myChart = new Chart(this.canvasRef.current, {
          type: 'bar',
          data: {
            labels: this.props.data.map(d => d.label),
            datasets: [{
              label: this.props.title,
              data: this.props.data.map(d => d.value),
              backgroundColor: this.props.color
            }]
          }
        });
      }


    render() {
      return <canvas />
    }
  }



/**
 * 
 * Chart.js requires its data property to be structured like:
 * {
  labels: ['A', 'B', 'C', ...],
  datasets: [{
    label: 'My data',
    data: [10, 20, 30, ...],
    backgroundColor: '#112233'
  }]
}
 */