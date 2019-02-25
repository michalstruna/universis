import Masonry from 'react-masonry-component'
import * as React from 'react'

import { StatelessComponent, DataTable , Units } from '../../Utils'
import { DonutChart } from '../../Charts'

interface IProps {
    body: IBody
    strings: IStrings
}

class BodyData extends StatelessComponent<IProps> {

    public render(): React.ReactNode {
        const { strings, body } = this.props

        if (!body) {
            return null
        }

        return (
            <section className='panel__body__data'>
                <section className='panel__body__data__preview'>
                    <section className='panel__body__data__preview--left'>
                        <h2 className='panel__body__data__subtitle'>
                            {body.type.name}
                        </h2>
                        <h1 className='panel__body__data__title'>
                            {body.name}
                        </h1>
                        <p className='panel__body__data__description'>
                            {body.description}
                        </p>
                    </section>
                    <section className='panel__body__data__preview--right' />
                </section>
                <Masonry
                    className={'panel__body__data__masonry'}
                    elementType={'section'}
                    options={{}}>
                    <DataTable
                        title={strings.size}
                        data={{
                            [strings.diameterX]: Units.toFull(body.diameter.x, Units.SIZE.KM, Units.SIZE),
                            [strings.diameterY]: Units.toFull(body.diameter.y, Units.SIZE.KM, Units.SIZE),
                            [strings.flattening]: Units.toFull(body.flattening),
                            [strings.circumference]: Units.toFull(body.circuit, Units.SIZE.KM, Units.SIZE),
                            [strings.surface]: Units.toShort(body.surface, Units.SURFACE.KM2, Units.SURFACE),
                            [strings.volume]: Units.toShort(body.volume, Units.VOLUME.KM3, Units.VOLUME)
                        }} />
                    <DataTable
                        title={strings.matter}
                        data={{
                            [strings.mass]: Units.toShort(body.mass, Units.MASS.KG),
                            [strings.density]: Units.toFull(body.density, Units.DENSITY.KG_M3),
                            [strings.composition]: () => (
                                <section className='panel__body__data__chart'>
                                    <DonutChart
                                        data={DonutChart.buildData(body.composition, item => item.element, item => item.percentage)} />
                                </section>
                            ),
                            [strings.escapeVelocity]: Units.toFull(body.escapeVelocity, Units.VELOCITY.KM_S),
                            [strings.gravitationalAcceleration]: Units.toFull(body.gravitationalAcceleration, Units.ACCELERATION.M_S2)
                        }} />
                    <DataTable
                        title={strings.orbit}
                        data={{
                            [strings.semiMajorAxis]: body.orbit ? Units.toFull(body.orbit.semiMajorAxis, Units.SIZE.KM) : null,
                            [strings.apocenter]: body.orbit ? Units.toFull(body.orbit.apocenter, Units.SIZE.KM) : null,
                            [strings.pericenter]: body.orbit ? Units.toFull(body.orbit.pericenter, Units.SIZE.KM) : null,
                            [strings.eccentricity]: body.orbit ? Units.toFull(body.orbit.eccentricity) : null,
                            [strings.orbitPeriod]: body.orbit ? Units.toFull(body.orbit.period, Units.TIME.Y, Units.TIME) : null,
                            [strings.inclination]: body.orbit ? Units.toFull(body.orbit.inclination, Units.ANGLE.DEGREE) : null,
                            [strings.orbitVelocity]: body.orbit ? () => (
                                <DataTable.FlexRow>
                                    {Units.toFull(body.orbit.velocity.min, Units.VELOCITY.KM_S, Units.VELOCITY)}
                                    {Units.toFull(body.orbit.velocity.avg, Units.VELOCITY.KM_S, Units.VELOCITY)}
                                    {Units.toFull(body.orbit.velocity.max, Units.VELOCITY.KM_S, Units.VELOCITY)}
                                </DataTable.FlexRow>
                            ) : null,
                            [strings.circuit]: body.orbit ? Units.toFull(body.orbit.circuit, Units.SIZE.KM, Units.SIZE) : null
                        }} />\\
                    <DataTable
                        title={strings.axis}
                        data={{
                            [strings.axisTilt]: Units.toFull(body.axis.tilt, Units.ANGLE.DEGREE),
                            [strings.axisPeriod]: Units.toFull(body.axis.period, Units.TIME.D),
                            [strings.axisVelocity]: Units.toFull(body.axis.velocity, Units.VELOCITY.M_S)
                        }} />
                    <DataTable
                        title={strings.atmosphere}
                        data={{
                            [strings.atmospherePressure]: '101 kPa', // TODO
                            [strings.atmosphereComposition]: () => (
                                <section className='panel__body__data__chart'>
                                    <DonutChart
                                        data={DonutChart.buildData(body.atmosphereComposition, item => item.element, item => item.percentage)} />
                                </section>
                            )
                        }} />
                    <DataTable
                        title={strings.visibility}
                        data={{
                            [strings.albedo]: Units.toFull(body.albedo),
                            [strings.magnitude]: Units.toFull(body.magnitude.relative),
                            [strings.absoluteMagnitude]: Units.toFull(body.magnitude.absolute)
                        }} />
                    <DataTable
                        title={strings.energy}
                        data={{
                            [strings.innerTemperature]: Units.toFull(body.temperature.inner, Units.TEMPERATURE.K),
                            [strings.outerTemperature]: Units.toFull(body.temperature.outer, Units.TEMPERATURE.K),
                            [strings.luminosity]: body.luminosity ? Units.toShort(body.luminosity, Units.LUMINOSITY.W) : null
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