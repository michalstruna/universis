import * as ClassNames from 'classnames'
import * as React from 'react'
import Masonry from 'react-masonry-component'

import { AsyncEntity, Units, View, DataTable, DetailEditor } from '../../Utils'
import { getApprovals, approve, disapprove } from '../Redux/ApprovalsActions'
import { SubjectType, UserRole } from '../../../../Constants'
import { Message } from '../../Panel'
import { DonutChart } from '../../Charts'

interface IProps {
    approvals: Universis.Redux.AsyncEntity<Universis.Approval[]>
    getApprovals: Universis.Runnable
    approve: Universis.Consumer<string>
    disapprove: Universis.Consumer<string>
    bodyStrings: Universis.Strings
    identity: Universis.Redux.AsyncEntity<Universis.User.Identity>
}

/**
 * View for unapproved items.
 */
class ApprovalsView extends View<IProps> {

    public componentDidMount(): void {
        const { approvals, getApprovals } = this.props
        AsyncEntity.request(approvals, getApprovals)
    }

    private renderItem(approval: Universis.Approval, isAfter: boolean): React.ReactNode {
        const data = isAfter ? approval.after : approval.before
        const { bodyStrings } = this.props

        if (!data) {
            return null
        }

        const texture = data.texture ? (
            <>
                <img src={`/Images/Uploaded/${data.texture}`} />
                <section className='approvals__block--right'>
                    {this.renderDiffValue(approval, ['texture'], isAfter)}
                </section>
            </>
        ) : null

        switch (approval.notification.subjectType) {
            case SubjectType.EVENT:
                const formatter = value => value < 0 ? Units.toShort(value) : Units.toFull(value)
                const toAfter = this.getValue(approval.after, ['to'])
                const toBefore = this.getValue(approval.before, ['to'])
                const fromAfter = this.getValue(approval.after, ['from'])
                const fromBefore = this.getValue(approval.before, ['from'])

                if (approval.after && toAfter == fromAfter) {
                    delete approval.after.to
                }

                if (approval.before && toBefore == fromBefore) {
                    delete approval.before.to
                }

                return (
                    <section className='approvals__item'>
                        <section className='events-area__event__detail'>
                            <div>
                                {
                                    !data.to || data.from === data.to ?
                                        this.renderDiffValue(approval, ['from'], isAfter, formatter) :
                                        <>
                                            {this.renderDiffValue(approval, ['from'], isAfter, formatter)} až {this.renderDiffValue(approval, ['to'], isAfter, formatter)}
                                        </>
                                }
                            </div>
                            <h3>
                                {this.renderDiffValue(approval, ['title'], isAfter)}
                            </h3>
                            <p>
                                {this.renderDiffValue(approval, ['description'], isAfter)}
                            </p>
                        </section>
                    </section>
                )

            case SubjectType.BODY_TYPE:
                const info = {}

                if (data.emissiveColor) {
                    info['Světlo'] = this.renderDiffValue(approval, ['emissiveColor'], isAfter)
                }

                if (data.particlesGenerator) {
                    info['Částice'] = () => (
                        <code className='approvals__code'>
                            {this.renderDiffValue(approval, ['particlesGenerator'], isAfter)}
                        </code>
                    )
                }

                return (
                    <section className='approvals__block'>
                        <h3>
                            {this.renderDiffValue(approval, ['name'], isAfter)}
                        </h3>
                        {texture}
                        <DataTable data={info} />
                    </section>
                )

            case SubjectType.BODY:
                return (
                    <section className='panel__body__data'>
                        <section className='panel__body__data__preview'>
                            <section className='panel__body__data__preview--left'>
                                <h2 className='panel__body__data__subtitle'>
                                    {this.renderDiffValue(approval, ['type', 'name'], isAfter)}
                                </h2>
                                <h1 className='panel__body__data__title'>
                                    {this.renderDiffValue(approval, ['name'], isAfter)}
                                </h1>
                                <p className='panel__body__data__description'>
                                    {this.renderDiffValue(approval, ['description'], isAfter)}
                                </p>
                            </section>
                            <section className='panel__body__data__preview--right'>
                                {texture}
                            </section>
                        </section>
                        <Masonry
                            className={'panel__body__data__masonry'}
                            elementType='section'
                            options={{}}>
                            <DataTable
                                title={bodyStrings.size}
                                data={{
                                    [bodyStrings.diameterX]: this.renderDiffValue(approval, ['diameter', 'x'], isAfter, value => Units.toFull(value, Units.SIZE.KM, Units.SIZE)),
                                    [bodyStrings.diameterY]: this.renderDiffValue(approval, ['diameter', 'y'], isAfter, value => Units.toFull(value, Units.SIZE.KM, Units.SIZE)),
                                    [bodyStrings.flattening]: this.renderDiffValue(approval, ['flattening'], isAfter, Units.toFull),
                                    [bodyStrings.circumference]: this.renderDiffValue(approval, ['circuit'], isAfter, value => Units.toFull(value, Units.SIZE.KM, Units.SIZE)),
                                    [bodyStrings.surface]: this.renderDiffValue(approval, ['surface'], isAfter, value => Units.toFull(value, Units.SURFACE.KM2, Units.SURFACE)),
                                    [bodyStrings.volume]: this.renderDiffValue(approval, ['volume'], isAfter, value => Units.toFull(value, Units.VOLUME.KM3, Units.VOLUME))
                                }} />
                            <DataTable
                                title={bodyStrings.matter}
                                data={{
                                    [bodyStrings.mass]: this.renderDiffValue(approval, ['mass'], isAfter, value => Units.toFull(value, Units.MASS.KG)),
                                    [bodyStrings.density]: this.renderDiffValue(approval, ['density'], isAfter, value => Units.toFull(value, Units.DENSITY.KG_M3)),
                                    [bodyStrings.composition]: () => (
                                        <section className='panel__body__data__chart'>
                                            <DonutChart
                                                data={DonutChart.buildData(data.composition, item => item.element, item => item.percentage)} />
                                        </section>
                                    ),
                                    [bodyStrings.escapeVelocity]: this.renderDiffValue(approval, ['escapeVelocity'], isAfter, value => Units.toFull(value, Units.VELOCITY.KM_S, Units.VELOCITY)),
                                    [bodyStrings.gravitationalAcceleration]: this.renderDiffValue(approval, ['gravitationalAcceleration'], isAfter, value => Units.toFull(value, Units.ACCELERATION.M_S2, Units.ACCELERATION)),
                                    [bodyStrings.gravitationalParameter]: this.renderDiffValue(approval, ['gravitationalParameter'], isAfter, value => Units.toFull(value, Units.GRAVITATIONAL_PARAMETER.KM3_S2))
                                }} />
                            <DataTable
                                title={bodyStrings.orbit}
                                data={{
                                    [bodyStrings.semiMajorAxis]: this.renderDiffValue(approval, ['orbit', 'semiMajorAxis'], isAfter, value => Units.toFull(value, Units.SIZE.KM)),
                                    [bodyStrings.apsis]: this.renderDiffValue(approval, ['orbit', 'apsis'], isAfter, value => Units.toFull(value, Units.SIZE.KM)),
                                    [bodyStrings.periapsis]: this.renderDiffValue(approval, ['orbit', 'periapsis'], isAfter, value => Units.toFull(value, Units.SIZE.KM)),
                                    [bodyStrings.eccentricity]: this.renderDiffValue(approval, ['orbit', 'eccentricity'], isAfter, Units.toFull),
                                    [bodyStrings.orbitPeriod]: this.renderDiffValue(approval, ['orbit', 'period'], isAfter, value => Units.toFull(value, Units.TIME.Y, Units.TIME)),
                                    [bodyStrings.inclination]: this.renderDiffValue(approval, ['orbit', 'inclination'], isAfter, value => Units.toFull(value, Units.ANGLE.DEGREE)),
                                    [bodyStrings.orbitVelocity]: data.orbit ? () => (
                                        <DataTable.FlexRow>
                                            {this.renderDiffValue(approval, ['orbit', 'velocity', 'min'], isAfter, value => Units.toFull(value, Units.VELOCITY.KM_S, Units.VELOCITY))}
                                            {this.renderDiffValue(approval, ['orbit', 'velocity', 'avg'], isAfter, value => Units.toFull(value, Units.VELOCITY.KM_S, Units.VELOCITY))}
                                            {this.renderDiffValue(approval, ['orbit', 'velocity', 'max'], isAfter, value => Units.toFull(value, Units.VELOCITY.KM_S, Units.VELOCITY))}
                                        </DataTable.FlexRow>
                                    ) : null,
                                    [bodyStrings.circuit]: this.renderDiffValue(approval, ['orbit', 'circuit'], isAfter, value => Units.toFull(value, Units.SIZE.KM, Units.SIZE))
                                }} />
                            <DataTable
                                title={bodyStrings.axis}
                                data={{
                                    [bodyStrings.axisTilt]: this.renderDiffValue(approval, ['axis', 'tilt'], isAfter, value => Units.toFull(value, Units.ANGLE.DEGREE)),
                                    [bodyStrings.axisPeriod]: this.renderDiffValue(approval, ['axis', 'period'], isAfter, value => Units.toFull(value, Units.TIME.D)),
                                    [bodyStrings.axisVelocity]: this.renderDiffValue(approval, ['axis', 'velocity'], isAfter, value => Units.toFull(value, Units.VELOCITY.M_S))
                                }} />
                            <DataTable
                                title={bodyStrings.atmosphere}
                                data={{
                                    [bodyStrings.atmospherePressure]: this.renderDiffValue(approval, ['atmosphere', 'pressure'], isAfter, value => Units.toFull(value, Units.PRESSURE.PA, Units.PRESSURE)),
                                    [bodyStrings.atmosphereComposition]: () => (
                                        <section className='panel__body__data__chart'>
                                            <DonutChart
                                                data={DonutChart.buildData(data.atmosphere.composition, item => item.element, item => item.percentage)} />
                                        </section>
                                    )
                                }} />
                            <DataTable
                                title={bodyStrings.visibility}
                                data={{
                                    [bodyStrings.albedo]: this.renderDiffValue(approval, ['albedo'], isAfter, Units.toFull),
                                    [bodyStrings.magnitude]: this.renderDiffValue(approval, ['magnitude', 'relative'], isAfter, Units.toFull),
                                    [bodyStrings.absoluteMagnitude]: this.renderDiffValue(approval, ['magnitude', 'absolute'], isAfter, Units.toFull)
                                }} />
                            <DataTable
                                title={bodyStrings.energy}
                                data={{
                                    [bodyStrings.innerTemperature]: this.renderDiffValue(approval, ['temperature', 'inner'], isAfter, value => Units.toFull(value, Units.TEMPERATURE.K)),
                                    [bodyStrings.outerTemperature]: this.renderDiffValue(approval, ['temperature', 'outer'], isAfter, value => Units.toFull(value, Units.TEMPERATURE.K)),
                                    [bodyStrings.luminosity]: this.renderDiffValue(approval, ['luminosity'], isAfter, value => Units.toFull(value, Units.LUMINOSITY.W))
                                }} />
                            <DataTable
                                title={bodyStrings.discover}
                                data={{
                                    [bodyStrings.discoverer]: this.renderDiffValue(approval, ['discover', 'author'], isAfter),
                                    [bodyStrings.discoverDate]: this.renderDiffValue(approval, ['discover', 'date'], isAfter)
                                }} />
                        </Masonry>
                    </section>
                )
        }
    }

    /**
     * Render value with color (add, change, delete).
     * @param approval
     * @param keys
     * @param isAfter
     * @param formatter
     * @returns Styled value.
     */
    private renderDiffValue(approval: Universis.Approval, keys: string[], isAfter: boolean, formatter: Universis.Function<any, any> = value => value): React.ReactNode {
        const after = this.getValue(approval.after, keys)
        const before = this.getValue(approval.before, keys)

        return (
            <span className={ClassNames(
                { 'approvals__value--deleted': before && !after },
                { 'approvals__value--added': !before && after },
                { 'approvals__value--changed': after && before && before != after }
            )}>
                {isAfter ? formatter(after) : formatter(before)}
            </span>
        )
    }

    /**
     * Get nested data or null.
     * @param data
     * @param keys
     * @returns Value or null.
     */
    private getValue(data: any, keys: string[]): any {
        try {
            let current = data

            for (const key of keys) {
                current = current[key]
            }

            return current
        } catch {
            return null
        }
    }

    private renderTools(approvalId): React.ReactNode {
        const { approve, disapprove, identity } = this.props

        if (!identity.payload || identity.payload.role !== UserRole.ADMIN) {
            return null
        }

        return (
            <p className='approvals__approval__tools'>
                <button
                    className='approvals__approval--approve'
                    onClick={() => {
                        if (confirm('Opravdu schválit?')) {
                            approve(approvalId)
                        }
                    }} />
                <button
                    className='approvals__approval--disapprove'
                    onClick={() => {
                        if (confirm('Opravdu zamítnout?')) {
                            disapprove(approvalId)
                        }
                    }} />
            </p>
        )
    }

    private renderApprovals(): React.ReactNode {
        const { approvals } = this.props

        return approvals.payload.map((approval, key) => {
            return (
                <section className='approvals__approval' key={key}>
                    <Message data={approval.notification} />
                    <section className='approvals__approval--inner'>
                        <section className='approvals__approval--left'>
                            {this.renderItem(approval, false)}
                        </section>
                        <section
                            className={'approvals__approval__relation approvals__approval__relation--' + approval.notification.operation} />
                        <section className='approvals__approval--right'>
                            {this.renderItem(approval, true)}
                        </section>
                    </section>
                    {this.renderTools(approval._id)}
                </section>
            )
        })
    }

    public render(): React.ReactNode {
        const { approvals } = this.props

        return (
            <section className={this.getClassName('approvals', true)}>
                <AsyncEntity data={approvals} success={() => (
                    <>
                        <h1 className='approvals__title'>
                            Čeká na schválení ({approvals.payload.length})
                        </h1>
                        {this.renderApprovals()}
                    </>
                )} />
            </section>
        )
    }

}

export default ApprovalsView.connect(
    ({ approval, system, user }: Universis.Redux.StoreState) => ({
        approvals: approval.approvals,
        bodyStrings: system.strings.bodyData,
        identity: user.identity
    }),
    { getApprovals, approve, disapprove }
)