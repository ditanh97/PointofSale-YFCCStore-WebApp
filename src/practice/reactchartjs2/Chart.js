import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';

class Chart extends Component {
    constructor(props){
        super(props);
        this.state = {
            chartData: {
                labels:  ['Dumai', 'Duri', 'Kandis', 'Minas', 'Pekanbaru'],
                datasets: [
                    {
                        label:'Population',
                        data:[
                            1901001,
                            1703004,
                            1410201,
                            1134023,
                            2010050
                            
                        ],
                        backgroundColor:[
                            'red',
                            // 'green',
                            // 'blue',
                            // 'yellow',
                            // 'purple'
                        ]
                    }
                ]

            }
        }
    }

    static defaultProps = {
        displayTitle : true,
        diplayLegend: true,
        legendPosition: 'bottom'
    }

    render(){
        return (
            <div className='chart'>

            <Line
            data={this.state.chartData}
            options={{
                title:{
                    dipslay: this.props.displayTitle,
                    text: 'Largest Cities in Riau',
                    fontSize: 10
                },
                legend:{
                    display: this.props.diplayLegend,
                    position: this.props.legendPosition
                }
            }}
            />
            </div>
        )
    }
}

export default Chart;

