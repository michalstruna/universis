import * as React from 'react'
import { HorizontalBar } from 'react-chartjs-2'

import StatelessComponent from '../../Utils/Components/StatelessComponent'

interface IProps {
    data: Array<{ value: number, name: string }>
    lineColor: string
    fontColor: string
    gridColor: string
    height?: number
    width?: number
}

class HorizontalBarChart extends StatelessComponent<IProps> {

    public static defaultProps = {
        lineColor: '#aaa',
        fontColor: '#eee',
        gridColor: '#555'
    }

    public render(): React.ReactNode {
        const { data, lineColor, fontColor, gridColor, height, width } = this.props

        return (
            <HorizontalBar
                height={height}
                width={width}
                legend={{
                    display: false
                }}
                data={{
                    labels: data.map(item => item.name),
                    datasets: [{
                        backgroundColor: 'rgb(0, 150, 200)',
                        borderWidth: 0,
                        data: data.map(item => item.value)
                    }]
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
                                fontColor: fontColor,
                                min: 0,
                                callback: value => value % 1 ? null : value
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

export default HorizontalBarChart.connect()