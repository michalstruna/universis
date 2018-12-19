import * as React from 'react'
import { Doughnut } from 'react-chartjs-2'
import 'chartjs-plugin-labels'

import StatelessComponent from './StatelessComponent'

interface IProps {
    data: IObject<number>
}

class DonutChart extends StatelessComponent<IProps> {

    public render(): React.ReactNode {
        return (
            <Doughnut
                legend={{
                    display: false
                }}
                data={{
                    labels: ['Fe', 'O', 'Si', 'Mg', 'Ni', 'Ca', 'Al', 'S', 'Na', 'Ti', 'K', 'Další'],
                    datasets: [{
                        backgroundColor: ['darkorange', 'red', '#b90', 'darkgreen', 'green', 'darkgreen', 'yellow', 'violet', 'gray', 'violet', 'white', 'white'],
                        borderWidth: 0,
                        data: [34.1, 28.2, 17.2, 15.9, 1.6, 1.6, 1.5, 0.7, 0.25, 0.071, 0.019, 0.53]
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