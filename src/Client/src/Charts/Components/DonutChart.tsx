import * as React from 'react'
import { Doughnut } from 'react-chartjs-2'
import 'chartjs-plugin-labels'

import StatelessComponent from '../../Utils/Components/StatelessComponent'

interface IProps {
    data: Universis.Map<number>
}

class DonutChart extends StatelessComponent<IProps> {

    /**
     * Transform data for donut chart.
     * @param items Array of any data.
     * @param getType Function to map item type.
     * @param getValue FUnction to map item value.
     * @returns Data for donut chart.
     */
    public static buildData(items: any[], getType: Universis.Function2<any, number, string>, getValue: Universis.Function2<any, number, number>): Universis.Map<number> {
        const result = {}

        for (const i in items) {
            result[getType(items[i], parseInt(i))] = getValue(items[i], parseInt(i))
        }

        return result
    }

    public render(): React.ReactNode {
        const { data } = this.props

        return (
            <Doughnut
                legend={{
                    display: false
                }}
                data={{
                    labels: Object.keys(data),
                    datasets: [{
                        backgroundColor: ['#06b', '#272', '#722', '#980', '#585', '#a60', '#808', '#088', '#664', '#477', '#747', '#467'],
                        borderWidth: 0,
                        data: Object.values(data)
                    }]
                }}
                options={{
                    maintainAspectRatio: false,
                    plugins: {
                        labels: {
                            fontColor: 'white',
                            overlap: false,
                            render: data => data.label + '\n' + data.percentage + '%'
                        }
                    }
                }} />
        )
    }

}

export default DonutChart.connect()