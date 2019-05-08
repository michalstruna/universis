import Masonry from 'react-masonry-component'
import * as React from 'react'

import { StatelessComponent, DataTable, Units, DetailEditor, FadeLayout, EditorControl } from '../../Utils'
import { DonutChart } from '../../Charts'
import { toggleBodyForm } from '../Redux/PanelActions'
import { deleteBody, updateBody } from '../../Universe'
import BodyForm from './BodyForm'

interface IProps {
    body: Universis.Universe.Body
    strings: Universis.Strings
    toggleBodyForm: Universis.Consumer2<boolean, Universis.Universe.Body>
    deleteBody: Universis.Consumer<string>
    updateBody: Universis.Consumer2<string, Universis.Universe.Body.New>
    isFormVisible: boolean
}

class BodyData extends StatelessComponent<IProps> {

    /**
     * Render add button.
     */
    private renderAdd(): React.ReactNode {
        const { isFormVisible } = this.props

        return (
            <FadeLayout
                mounted={isFormVisible}
                className='panel__body__form'
                type={FadeLayout.SCALE}>
                <BodyForm />
            </FadeLayout>
        )
    }

    public render(): React.ReactNode {
        const { strings, body, toggleBodyForm, deleteBody } = this.props

        if (!body) {
            return null
        }

        return (
            <section className='panel__body__data'>
                <section className='panel__body__data__preview'>
                    <section className='panel__body__data__preview--left'>
                        <h2 className='panel__body__data__subtitle'>
                            {body.type.name}
                            <DetailEditor
                                onEdit={() => toggleBodyForm(true, body)}
                                onDelete={() => {
                                    if (confirm(`Opravdu smazat těleso ${body.name}?`)) {
                                        deleteBody(body._id)
                                    }
                                }} />
                        </h2>
                        <h1 className='panel__body__data__title'>
                            {body.name}
                        </h1>
                        <p className='panel__body__data__description'>
                            {body.description}                        <>
                        </>
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
                            [strings.flattening]: body.flattening !== 0 ? Units.toFull(body.flattening) : 0,
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
                            [strings.escapeVelocity]: Units.toFull(body.escapeVelocity, Units.VELOCITY.KM_S, Units.VELOCITY),
                            [strings.gravitationalAcceleration]: Units.toFull(body.gravitationalAcceleration, Units.ACCELERATION.M_S2, Units.ACCELERATION),
                            [strings.gravitationalParameter]: Units.toFull(body.gravitationalParameter, Units.GRAVITATIONAL_PARAMETER.KM3_S2)
                        }} />
                    <DataTable
                        title={strings.orbit}
                        data={{
                            [strings.semiMajorAxis]: body.orbit ? Units.toFull(body.orbit.semiMajorAxis, Units.SIZE.KM) : null,
                            [strings.apsis]: body.orbit ? Units.toFull(body.orbit.apsis, Units.SIZE.KM) : null,
                            [strings.periapsis]: body.orbit ? Units.toFull(body.orbit.periapsis, Units.SIZE.KM) : null,
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
                        }} />
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
                            [strings.atmospherePressure]: Units.toFull(body.atmosphere.pressure, Units.PRESSURE.PA, Units.PRESSURE),
                            [strings.atmosphereComposition]: () => (
                                <section className='panel__body__data__chart'>
                                    <DonutChart
                                        data={DonutChart.buildData(body.atmosphere.composition, item => item.element, item => item.percentage)} />
                                </section>
                            )
                        }} />
                    <DataTable
                        title={strings.visibility}
                        data={{
                            [strings.albedo]: Units.toFull(body.albedo),
                            [strings.magnitude]: body.magnitude ? Units.toFull(body.magnitude.relative) : null,
                            [strings.absoluteMagnitude]: body.magnitude ? Units.toFull(body.magnitude.absolute) : null
                        }} />
                    <DataTable
                        title={strings.energy}
                        data={{
                            [strings.innerTemperature]: body.temperature ? Units.toFull(body.temperature.inner, Units.TEMPERATURE.K) : null,
                            [strings.outerTemperature]: body.temperature ? Units.toFull(body.temperature.outer, Units.TEMPERATURE.K) : null,
                            [strings.luminosity]: body.luminosity ? Units.toShort(body.luminosity, Units.LUMINOSITY.W, Units.LUMINOSITY) : null
                        }} />
                    <DataTable
                        title={strings.discover}
                        data={{
                            [strings.discoverer]: body.discover ? body.discover.author : null,
                            [strings.discoverDate]: body.discover ? body.discover.date : null
                        }} />
                </Masonry>
                {this.renderAdd()}
            </section>
        )
    }

}

export default BodyData.connect(
    ({ system, universe, panel }: Universis.Redux.StoreState) => ({
        strings: system.strings.bodyData,
        body: universe.body.payload,
        isFormVisible: panel.isBodyFormVisible
    }),
    { deleteBody, updateBody, toggleBodyForm }
)