import * as React from 'react'

import BodiesFilterForm from './BodiesFilterForm'
import BodiesSettingsForm from './BodiesSettingsForm'
import { Units, getBodies, selectBody } from '../../Universe'
import { StatelessComponent, Table, Filter, AsyncEntity, Url } from '../../Utils'

interface IProps {
    bodies: IAsyncEntity<ISimpleBody[]>
    selectBody: IConsumer<string>
    filter: IFilter
    getBodies: IRunnable
    strings: IStrings
}

/**
 * Components for chat.
 */
class Bodies extends StatelessComponent<IProps> {

    private getColumns(): IColumn[] {
        return [
            {
                accessor: body => body.name,
                title: this.props.strings.name,
            },
            this.getTableColumn(
                body => body.diameter.x,
                this.props.strings.diameter,
                diameter => Units.formatSize(diameter, Units.SHORT)
            ),
            this.getTableColumn(
                body => body.mass,
                this.props.strings.mass,
                mass => Units.formatMass(mass, Units.EXPONENTIAL)
            ),
            this.getTableColumn(
                body => body.density,
                this.props.strings.density,
                density => Units.formatDensity(density, Units.SHORT)
            ),
            this.getTableColumn(
                body => body.orbit ? body.orbit.apocenter : null,
                this.props.strings.apocenter,
                apocenter => apocenter ? Units.formatSize(apocenter, Units.SHORT) : null
            ),
            this.getTableColumn(
                body => body.orbit ? body.orbit.pericenter : null,
                this.props.strings.pericenter,
                pericenter => pericenter ? Units.formatSize(pericenter, Units.SHORT) : null
            ),
            this.getTableColumn(
                body => body.orbit ? body.orbit.eccentricity : null,
                this.props.strings.eccentricity
            ),
            this.getTableColumn(
                body => body.orbit ? body.orbit.period : null,
                this.props.strings.year,
                period => period ? Units.formatTime(period, Units.SHORT, Units.TIME.Y) : null
            ),
            this.getTableColumn(
                body => body.axis.period,
                this.props.strings.day,
                period => period ? Units.formatTime(period, Units.SHORT, Units.TIME.D) : null
            ),
            this.getTableColumn(
                body => body.escapeVelocity,
                this.props.strings.escapeVelocity
            ),
            this.getTableColumn(
                body => body.axis.tilt,
                this.props.strings.axisTilt
            ),
            this.getTableColumn(
                body => body.orbit ? body.orbit.velocity : null,
                this.props.strings.orbitVelocity
            ),
            this.getTableColumn(
                body => body.temperature.outer,
                this.props.strings.outerTemperature,
                value => Units.formatTemperature(value, Units.SHORT)
            ),
            this.getTableColumn(
                body => body.temperature.inner,
                this.props.strings.innerTemperature,
                value => Units.formatTemperature(value, Units.SHORT)
            ),
            this.getTableColumn(
                body => body.discover.date,
                this.props.strings.discoverDate
            ),
            this.getTableColumn(
                body => body.flattening,
                this.props.strings.flattening
            ),
            this.getTableColumn(
                body => body.magnitude.relative,
                this.props.strings.relativeMagnitude
            ),
            this.getTableColumn(
                body => body.magnitude.absolute,
                this.props.strings.absoluteMagnitude
            ),
            this.getTableColumn(
                body => body.orbit ? body.axis.velocity : null,
                this.props.strings.axisVelocity
            ),
            this.getTableColumn(
                body => body.albedo,
                this.props.strings.albedo
            ),
            this.getTableColumn(
                body => body.luminosity,
                this.props.strings.luminosity,
                luminosity => Units.formatLuminosity(luminosity, Units.EXPONENTIAL)
            ),
        ]
    }

    /**
     * Get column definition for table.
     * @param accessor Accessor of property.
     * @param title Label of column.
     * @param render Render absolute value. (optional)
     * @returns Table column definition.
     */
    private getTableColumn(accessor: IColumnAccesor, title: string, render: IRenderColumn = value => Units.formatUnitLess(value, Units.SHORT)): IColumn {
        const { bodies, location } = this.props
        const bodySettings = Url.getJsonQuery(Url.QUERIES.BODIES_SETTINGS, location.search)
        const relativeTo = bodySettings ? bodies.payload.find(body => body._id === bodySettings.valuesType) : null

        if (relativeTo) {
            const render = value => {
                if (!value || !accessor(relativeTo)) {
                    return null
                } else {
                    return Units.formatUnitLess(value, Units.SHORT)
                }
            }

            return { accessor: body => accessor(body) / accessor(relativeTo), title, render }
        } else {
            return { accessor, title, render }
        }
    }

    public componentWillMount(): void {
        const { bodies, getBodies } = this.props
        AsyncEntity.request(bodies, getBodies)
    }

    /**
     * Render list of bodies.
     * @returns Bodies.
     */
    private renderTable(): JSX.Element {
        const { bodies, selectBody, location } = this.props

        return (
            <AsyncEntity
                data={bodies}
                success={() => (
                    <section className='panel__bodies__table'>
                        <Table
                            columns={this.getColumns()}
                            items={Filter.apply(bodies.payload, JSON.parse(Url.getQuery(location.search, Url.QUERIES.BODIES_FILTER)))}
                            onRowClick={(body: ISimpleBody) => selectBody(body._id)} />
                    </section>
                )} />
        )
    }

    /**
     * Render filter form.
     * @returns Filter form.
     */
    private renderFilter(): JSX.Element {
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
    private renderSettings(): JSX.Element {
        return (
            <section className='panel__bodies__settings'>
                <BodiesSettingsForm />
            </section>
        )
    }

    public render(): JSX.Element {
        return (
            <section className='panel__bodies panel__window'>
                <section className='panel__bodies'>
                    {this.renderFilter()}
                    {this.renderSettings()}
                    <section className='panel__bodies--inner'>
                        {this.renderTable()}
                    </section>
                </section>
            </section>
        )
    }

}

export default Bodies.connect(
    ({ universe, system }: IStoreState) => ({
        bodies: universe.bodies,
        strings: system.strings.bodies
    }),
    { getBodies, selectBody }
)