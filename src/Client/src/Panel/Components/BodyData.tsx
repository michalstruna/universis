import Masonry from 'react-masonry-component'
import * as React from 'react'
import { Doughnut } from 'react-chartjs-2'

import { StatelessComponent, DataTable } from '../../Utils'
import { Units } from '../../Universe'

interface IProps {
    body: IBody
    strings: IStrings
}

class BodyData extends StatelessComponent<IProps> {

    private renderPieChart(data: object): React.ReactNode {
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

    public render(): React.ReactNode {
        const { strings, body } = this.props

        return (
            <section className='panel__body__data'>
                <Masonry
                    className={'panel__body__data__masonry'}
                    elementType={'section'}
                    options={{}}>
                    <DataTable
                        title={strings.size}
                        data={{
                            [strings.diameterX]: Units.formatSize(body.diameter.x, Units.FULL),
                            [strings.diameterY]: Units.formatSize(body.diameter.y, Units.FULL),
                            [strings.flattening]: Units.formatUnitLess(body.flattening, Units.FULL),
                            [strings.surface]: Units.formatSurface(body.surface, Units.SHORT),
                            [strings.volume]: Units.formatVolume(body.volume, Units.SHORT)
                        }} />
                    <DataTable
                        title={strings.matter}
                        data={{
                            [strings.mass]: Units.formatMass(body.mass, Units.SHORT),
                            [strings.density]: Units.formatDensity(body.density, Units.FULL),
                            [strings.composition]: () => (
                                <section className='panel__body__data__chart'>
                                    {this.renderPieChart(body.composition)}
                                </section>
                            ),
                            [strings.escapeVelocity]: Units.formatUnitLess(body.escapeVelocity, Units.FULL),
                            [strings.gravity]: Units.formatUnitLess(body.escapeVelocity, Units.FULL), // TODO
                        }} />
                    <DataTable
                        title={strings.orbit}
                        data={{
                            [strings.semimajorAxis]: Units.formatSize(body.orbit.pericenter, Units.FULL), // TODO
                            [strings.apocenter]: Units.formatSize(body.orbit.pericenter, Units.FULL),
                            [strings.pericenter]: Units.formatSize(body.orbit.pericenter, Units.FULL),
                            [strings.eccentricity]: Units.formatUnitLess(body.orbit.eccentricity, Units.FULL),
                            [strings.orbitPeriod]: Units.formatTime(body.orbit.period, Units.FULL, Units.TIME.Y),
                            [strings.orbitVelocity]: Units.formatUnitLess(body.orbit.velocity, Units.FULL), // TODO
                            [strings.inclination]: Units.formatUnitLess(body.orbit.inclination, Units.FULL), // TODO
                            [strings.circuit]: Units.formatSize(body.orbit.circuit, Units.FULL)
                        }} />
                    <DataTable
                        title={strings.axis}
                        data={{
                            [strings.axisTilt]: Units.formatUnitLess(body.axis.tilt, Units.FULL),
                            [strings.axisPeriod]: Units.formatTime(body.axis.period, Units.FULL, Units.TIME.D),
                            [strings.axisVelocity]: Units.formatUnitLess(body.axis.velocity, Units.FULL)
                        }} />
                    <DataTable
                        title={strings.atmosphere}
                        data={{
                            [strings.atmospherePressure]: 'TODO', // TODO
                            [strings.atmosphereCoposition]: () => (
                                <section className='panel__body__data__chart'>
                                    {this.renderPieChart(body.composition)}
                                </section>
                            )
                        }} />
                    <DataTable
                        title={strings.visibility}
                        data={{
                            [strings.albedo]: Units.formatUnitLess(body.albedo, Units.FULL),
                            [strings.magnitude]: Units.formatUnitLess(body.magnitude.relative, Units.FULL),
                            [strings.absoluteMagnitude]: Units.formatUnitLess(body.magnitude.absolute, Units.FULL)
                        }} />
                    <DataTable
                        title={strings.energy}
                        data={{
                            [strings.innerTemperature]: Units.formatUnitLess(body.temperature.inner, Units.FULL),
                            [strings.outerTemperature]: Units.formatUnitLess(body.temperature.outer, Units.FULL),
                            [strings.luminosity]: Units.formatUnitLess(body.luminosity, Units.FULL)
                        }} />
                    <DataTable
                        title={strings.discover}
                        data={{
                            [strings.discoverer]: body.discover.author,
                            [strings.discoverDate]: body.discover.date
                        }} />
                </Masonry>
            </section>
        )
    }

}

export default BodyData.connect(
    ({ system, universe }: IStoreState) => ({
        strings: system.strings.bodyData,
        body: universe.body.payload
    })
)