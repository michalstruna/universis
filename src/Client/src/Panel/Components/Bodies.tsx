import * as React from 'react'

import BodyFilterForm from './BodyFilterForm'
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

    /**
     * List of all columns in table.
     */
    private readonly columns = [
        {
            accessor: body => body.name,
            title: this.props.strings.name,
        },
        {
            accessor: body => body.diameter.x,
            title: this.props.strings.diameter,
            render: diameter => Units.formatSize(diameter, Units.SHORT)
        },
        {
            accessor: body => body.mass,
            title: this.props.strings.mass,
            render: mass => Units.formatMass(mass, Units.EXPONENTIAL)
        },
        {
            accessor: body => body.density,
            title: this.props.strings.density,
            render: density => Units.formatDensity(density, Units.SHORT)
        },
        {
            accessor: body => body.orbit ? body.orbit.apocenter : null,
            title: this.props.strings.apocenter,
            render: apocenter => apocenter ? Units.formatSize(apocenter, Units.SHORT) : null
        },
        {
            accessor: body => body.orbit ? body.orbit.pericenter : null,
            title: this.props.strings.pericenter,
            render: pericenter => pericenter ? Units.formatSize(pericenter, Units.SHORT) : null
        },
        {
            accessor: body => body.orbit ? body.orbit.eccentricity : null,
            title: this.props.strings.eccentricity
        },
        {
            accessor: body => body.orbit ? body.orbit.period : null,
            title: this.props.strings.year,
            render: period => period ? Units.formatTime(period, Units.SHORT, Units.TIME.Y) : null
        },
        {
            accessor: body => body.axis.period,
            title: this.props.strings.day,
            render: period => period ? Units.formatTime(period, Units.SHORT, Units.TIME.D): null
        },
        {
            accessor: body => body.escapeVelocity,
            title: this.props.strings.escapeVelocity
        },
        {
            accessor: body => body.axis.tilt,
            title: this.props.strings.axisTilt
        },
        {
            accessor: body => body.orbit ? body.orbit.velocity : null,
            title: this.props.strings.orbitVelocity
        },
        {
            accessor: body => body.temperature.outer,
            title: this.props.strings.outerTemperature,
            render: value => Units.formatTemperature(value, Units.SHORT)
        },
        {
            accessor: body => body.temperature.inner,
            title: this.props.strings.innerTemperature,
            render: value => Units.formatTemperature(value, Units.SHORT)
        },
        {
            accessor: body => body.discover.date,
            title: this.props.strings.discoverDate
        },
        {
            accessor: body => body.flattening,
            title: this.props.strings.flattening
        },
        {
            accessor: body => body.magnitude.relative,
            title: this.props.strings.relativeMagnitude
        },
        {
            accessor: body => body.magnitude.absolute,
            title: this.props.strings.absoluteMagnitude
        },
        {
            accessor: body => body.orbit ? body.axis.velocity : null,
            title: this.props.strings.axisVelocity
        },
        {
            accessor: body => body.albedo,
            title: this.props.strings.albedo
        },
        {
            accessor: body => body.luminosity,
            title: this.props.strings.luminosity,
            render: luminosity => Units.formatLuminosity(luminosity, Units.EXPONENTIAL)
        }
    ]

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
                            columns={this.columns}
                            items={Filter.apply(bodies.payload, JSON.parse(Url.getQuery(location.search, Url.QUERIES.BODY_FILTER)))}
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
                <BodyFilterForm />
            </section>
        )
    }

    public render(): JSX.Element {
        return (
            <section className='panel__bodies panel__window'>
                <section className='panel__bodies'>
                    {this.renderFilter()}
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
        strings: system.strings.panel.bodies
    }),
    { getBodies, selectBody }
)