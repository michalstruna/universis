import * as React from 'react'
import { Line } from 'react-chartjs-2'

import StatelessComponent from '../../Utils/Components/StatelessComponent'

interface IProps {
    labels: string[]
    values: number[]
    lineColor?: string
    fontColor?: string
    gridColor?: string
    height: number
    width: number
}

class LineChart extends StatelessComponent<IProps> {

    public static defaultProps = {
        lineColor: '#aaa',
        fontColor: '#eee',
        gridColor: '#555'
    }

    public render(): React.ReactNode {
        const { labels, values, lineColor, fontColor, gridColor, height, width } = this.props

        return (
            <Line
                legend={{
                    display: false
                }}
                height={height}
                width={width}
                data={{
                    labels,
                    datasets: [
                        {
                            data: values,
                            borderColor: lineColor,
                            fill: false,
                            lineTension: 0,
                            borderWidth: 2,
                            radius: 0
                        }
                    ]
                }}
                options={{
                    scales: {
                        yAxes: [{
                            ticks: {
                                fontColor: fontColor
                            },
                            gridLines: {
                                color: gridColor
                            }
                        }],
                        xAxes: [{
                            ticks: {
                                fontColor: fontColor
                            },
                            gridLines: {
                                color: gridColor
                            }
                        }]
                    }
                }} />
        )
    }

}

export default LineChart.connect()