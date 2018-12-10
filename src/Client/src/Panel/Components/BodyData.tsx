import Masonry from 'react-masonry-component'
import * as React from 'react'
import { Chart } from 'react-google-charts'

import { StatelessComponent, DataTable, Loader } from '../../Utils'
import { Units } from '../../Universe'

interface IProps {
    body: IBody
    strings: IStrings
}

class BodyData extends StatelessComponent<IProps> {

    private static renderPieChart(data: object): React.ReactNode {
        return (
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
        )
    }

    public render(): React.ReactNode {
        const { strings, body } = this.props

        if (!body) {
            return null
        }

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
                            [strings.circumference]: Units.formatSize(40075, Units.FULL),
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
                                    {BodyData.renderPieChart(body.composition)}
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
                                    {BodyData.renderPieChart(body.composition)}
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