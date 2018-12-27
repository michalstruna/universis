import * as React from 'react'
import { Doughnut } from 'react-chartjs-2'

import StatelessComponent from './StatelessComponent'

interface IProps {
    data: IObject<number>
}

class DonutChart extends StatelessComponent<IProps> {

    public render(): React.ReactNode {
        return (
            <Doughnut
                legend={{
                    labels: {
                        fontColor: '#eee'
                    }
                }}
                data={{
                    labels: ['He', 'H', 'O', 'N', 'C', 'X'],
                    datasets: [{
                        backgroundColor: ['#484', '#27a', '#b90', '#a33', '#2aa', '#aa6'],
                        borderWidth: 0,
                        data: [80, 20, 15, 36, 47, 5]
                    }]
                }}
                options={{
                    maintainAspectRatio: false
                }} />
        )
    }

}

export default DonutChart.connect()