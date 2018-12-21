import Masonry from 'react-masonry-component'
import * as React from 'react'

import { StatelessComponent, DataTable, DonutChart, Units } from '../../Utils'
import { BodyPreview } from '../../Universe'

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
                            Jupiter je největší planeta sluneční soustavy, v pořadí pátá od Slunce.
                            Je 3krát hmotnější, než všechny ostatní planety sluneční soustavy dohromady.
                            Symbolickým útvarem je Velká rudá skvrna.
                            Jedná se o bouři dvakrát větší, než Země.
                        </p>
                    </section>
                    <section className='panel__body__data__preview--right'>
                        <BodyPreview body={body} size={300} />
                    </section>
                </section>
                <Masonry
                    className={'panel__body__data__masonry'}
                    elementType={'section'}
                    options={{}}>
                    <DataTable
                        title={strings.size}
                        data={{
                            [strings.diameterX]: Units.formatSize(body.diameter.x, Units.toFull),
                            [strings.diameterY]: Units.formatSize(body.diameter.y, Units.toFull),
                            [strings.flattening]: Units.toFull(body.flattening),
                            [strings.circumference]: Units.formatSize(40075, Units.toFull),
                            [strings.surface]: Units.formatSurface(body.surface, Units.toShort),
                            [strings.volume]: Units.formatVolume(body.volume, Units.toShort)
                        }} />
                    <DataTable
                        title={strings.matter}
                        data={{
                            [strings.mass]: Units.formatMass(body.mass, Units.toShort),
                            [strings.density]: Units.formatDensity(body.density, Units.toFull),
                            [strings.composition]: () => (
                                <section className='panel__body__data__chart'>
                                    <DonutChart data={body.composition} />
                                </section>
                            ),
                            [strings.escapeVelocity]: Units.toFull(body.escapeVelocity),
                            [strings.gravity]: Units.toFull(body.escapeVelocity), // TODO
                        }} />
                    <DataTable
                        title={strings.orbit}
                        data={{
                            [strings.semimajorAxis]: Units.formatSize(body.orbit.pericenter, Units.toFull), // TODO
                            [strings.apocenter]: Units.formatSize(body.orbit.pericenter, Units.toFull),
                            [strings.pericenter]: Units.formatSize(body.orbit.pericenter, Units.toFull),
                            [strings.eccentricity]: Units.toFull(body.orbit.eccentricity),
                            [strings.orbitPeriod]: Units.formatTime(body.orbit.period, Units.toFull, Units.TIME.Y),
                            [strings.orbitVelocity]: Units.toFull(body.orbit.velocity), // TODO
                            [strings.inclination]: Units.toFull(body.orbit.inclination), // TODO
                            [strings.circuit]: Units.formatSize(body.orbit.circuit, Units.toFull)
                        }} />
                    <DataTable
                        title={strings.axis}
                        data={{
                            [strings.axisTilt]: Units.toFull(body.axis.tilt),
                            [strings.axisPeriod]: Units.formatTime(body.axis.period, Units.toFull, Units.TIME.D),
                            [strings.axisVelocity]: Units.toFull(body.axis.velocity)
                        }} />
                    <DataTable
                        title={strings.atmosphere}
                        data={{
                            [strings.atmospherePressure]: 'TODO', // TODO
                            [strings.atmosphereCoposition]: () => (
                                <section className='panel__body__data__chart'>
                                    <DonutChart data={body.composition} />
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
                            [strings.innerTemperature]: Units.toFull(body.temperature.inner),
                            [strings.outerTemperature]: Units.toFull(body.temperature.outer),
                            [strings.luminosity]: Units.toFull(body.luminosity)
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