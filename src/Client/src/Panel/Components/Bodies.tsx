import * as React from 'react'

import BodiesFilterForm from './BodiesFilterForm'
import BodiesSettingsForm from './BodiesSettingsForm'
import { getBodies } from '../../Universe'
import { StatelessComponent, Table, Filter, AsyncEntity, Url, Queries, Dates, Units } from '../../Utils'

interface IProps {
    bodies: Universis.Redux.AsyncEntity<Universis.Universe.Body.Simple[]>
    selectBody: Universis.Consumer<string>
    filter: Universis.Filter
    getBodies: Universis.Runnable
    strings: Universis.Strings
}

/**
 * Components for chat.
 */
class Bodies extends StatelessComponent<IProps> {

    public componentWillMount(): void {
        const { bodies, getBodies } = this.props
        AsyncEntity.request(bodies, getBodies)
    }

    private getColumns(): IColumn<Universis.Universe.Body.Simple>[] {
        const { strings } = this.props

        return [
            {
                accessor: body => body.name,
                title: strings.name
            },
            this.getTableColumn(
                body => body.diameter.x,
                strings.diameter,
                diameter => Units.toShort(diameter, Units.SIZE.KM, Units.SIZE)
            ),
            this.getTableColumn(
                body => body.mass,
                strings.mass,
                mass => Units.toExponential(mass, Units.MASS.KG)
            ),
            this.getTableColumn(
                body => body.density,
                strings.density,
                density => Units.toShort(density, Units.DENSITY.KG_M3)
            ),
            this.getTableColumn(
                body => body.orbit ? body.orbit.apsis : null,
                strings.apsis,
                apsis => apsis ? Units.toShort(apsis, Units.SIZE.KM, Units.SIZE) : null
            ),
            this.getTableColumn(
                body => body.orbit ? body.orbit.periapsis : null,
                strings.periapsis,
                periapsis => periapsis ? Units.toShort(periapsis, Units.SIZE.KM, Units.SIZE) : null
            ),
            this.getTableColumn(
                body => body.orbit ? body.orbit.eccentricity : null,
                strings.eccentricity
            ),
            this.getTableColumn(
                body => body.orbit ? body.orbit.period : null,
                strings.year,
                period => period ? Units.toShort(period, Units.TIME.Y, Units.TIME) : null
            ),
            this.getTableColumn(
                body => body.axis.period,
                strings.day,
                period => period ? Units.toShort(period, Units.TIME.D, Units.TIME) : null
            ),
            this.getTableColumn(
                body => body.escapeVelocity,
                strings.escapeVelocity,
                velocity => Units.toShort(velocity, Units.VELOCITY.KM_S, Units.VELOCITY)
            ),
            this.getTableColumn(
                body => body.axis.tilt,
                strings.axisTilt
            ),
            this.getTableColumn(
                body => body.orbit ? body.orbit.velocity : null,
                strings.orbitVelocity
            ),
            this.getTableColumn(
                body => body.temperature.outer,
                strings.outerTemperature,
                value => Units.toShort(value, Units.TEMPERATURE.K)
            ),
            this.getTableColumn(
                body => body.temperature.inner,
                strings.innerTemperature,
                value => Units.toShort(value, Units.TEMPERATURE.K)
            ),
            this.getTableColumn(
                body => body.discover ? body.discover.date : null,
                strings.discoverDate,
                date => Dates.formatISO(date, Dates.FORMAT.DATE)
            ),
            this.getTableColumn(
                body => body.flattening,
                strings.flattening
            ),
            this.getTableColumn(
                body => body.magnitude.relative,
                strings.relativeMagnitude
            ),
            this.getTableColumn(
                body => body.magnitude.absolute,
                strings.absoluteMagnitude
            ),
            this.getTableColumn(
                body => body.orbit ? body.axis.velocity : null,
                strings.axisVelocity
            ),
            this.getTableColumn(
                body => body.albedo,
                strings.albedo
            ),
            this.getTableColumn(
                body => body.luminosity,
                strings.luminosity,
                luminosity => Units.toExponential(luminosity, Units.LUMINOSITY.W)
            ),
            this.getTableColumn(
                body => body.atmosphere.pressure,
                strings.atmospherePressure,
                pressure => Units.toShort(pressure, Units.PRESSURE.PA, Units.PRESSURE)
            ),
            this.getTableColumn(
                body => body.rings.length,
                strings.rings,
                rings => rings.length
            ),
            this.getTableColumn(
                body => body.rings.length,
                strings.satellites,
                rings => rings.length
            )
        ]
    }

    /**
     * Get column definition for table.
     * @param accessor Accessor of property.
     * @param title Label of column.
     * @param render Render absolute value. (optional)
     * @returns Table column definition.
     */
    private getTableColumn(accessor: IColumnAccesor<Universis.Universe.Body.Simple>, title: string, render: IRenderColumn<Universis.Universe.Body.Simple> = value => Units.toShort(value)): IColumn<Universis.Universe.Body.Simple> {
        const { bodies, location } = this.props
        const bodySettings = Url.getJsonQuery(Queries.BODIES_SETTINGS, location.search)
        const relativeTo = bodySettings ? bodies.payload.find(body => body._id === bodySettings.valuesType) : null

        if (relativeTo) {
            const render = value => {
                if (!value || !accessor(relativeTo)) {
                    return null
                } else {
                    return Units.toShort(value)
                }
            }

            return { accessor: body => accessor(body) / accessor(relativeTo), title, render }
        } else {
            return { accessor, title, render }
        }
    }

    /**
     * Render list of bodies.
     * @returns Bodies.
     */
    private renderTable(): React.ReactNode {
        const { bodies, location } = this.props

        return (
            <AsyncEntity
                data={bodies}
                success={() => (
                    <section className='panel__bodies__table'>
                        <Table
                            columns={this.getColumns()}
                            items={Filter.apply(bodies.payload, (Url.getJsonQuery(Queries.BODIES_FILTER, location.search)))}
                            onRowClick={this.handleBodyClick} />
                    </section>
                )} />
        )
    }

    /**
     * Handler for table row click.
     * @param body Clicked body.
     */
    private handleBodyClick = (body: Universis.Universe.Body.Simple) => {
        Url.push({ query: { [Queries.PANEL]: Queries.BODY, [Queries.BODY]: body.name } })
    }

    /**
     * Render filter form.
     * @returns Filter form.
     */
    private renderFilter(): React.ReactNode {
        return (
            <section className='panel__bodies__filter'>
                <BodiesFilterForm />
            </section>
        )
    }

    /**
     * Render filter form.
     * @returns Filter form.
     */
    private renderSettings(): React.ReactNode {
        return (
            <section className='panel__bodies__settings'>
                <BodiesSettingsForm />
            </section>
        )
    }

    public render(): React.ReactNode {
        return (
            <section className='panel__bodies panel__window'>
                {this.renderSettings()}
                {this.renderFilter()}
                <section className='panel__bodies--inner'>
                    {this.renderTable()}
                </section>
            </section>
        )
    }

}

export default Bodies.connect(
    ({ universe, system }: Universis.Redux.StoreState) => ({
        bodies: universe.bodies,
        strings: system.strings.bodies
    }),
    { getBodies }
)