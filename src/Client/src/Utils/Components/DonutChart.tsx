import * as React from 'react'
import { Chart } from 'react-google-charts'

import StatelessComponent from './StatelessComponent'
import Loader from './Loader'

interface IProps {
    data: IObject<number>
}

class DonutChart extends StatelessComponent<IProps> {

    public render(): React.ReactNode {
        return (
            <section className='chart chart--donut'>
                <Chart
                    width={'300px'}
                    height={'300px'}
                    chartType='PieChart'
                    loader={<Loader />}
                    data={[
                        ['Task', 'Hours per Day'],
                        ['He', 11],
                        ['H', 2],
                        ['C', 2],
                        ['O', 2],
                        ['Uup', 7],
                    ]}
                    options={{
                        backgroundColor: 'transparent',
                        pieHole: 0.5,
                        pieSliceBorderColor: 'transparent',
                        legend: 'none',
                        pieSliceText: 'value-and-percentage',
                        chartArea: {
                            left: 0,
                            top: 10,
                            width: '100%',
                            height: '80%'
                        },
                        tooltip: {
                            ignoreBounds: true,
                            text: 'percentage'
                        }
                    }}
                />
            </section>
        )
    }

}

export default DonutChart.connect()