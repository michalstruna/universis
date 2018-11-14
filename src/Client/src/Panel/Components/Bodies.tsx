import * as React from 'react'

import BodyFilterForm from './BodyFilterForm'
import { UniverseActions, Units } from '../../Universe'
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
            title: 'Excentricita'
        },
        {
            accessor: body => body.orbit ? body.orbit.period : null,
            title: 'Rok',
            render: period => period ? Units.formatTime(period, Units.SHORT, Units.TIME.Y) : null
        },
        {
            accessor: body => body.axis.period,
            title: 'Den',
            render: period => period ? Units.formatTime(period, Units.SHORT, Units.TIME.D): null
        },
        {
            accessor: body => body.escapeVelocity,
            title: 'Úniková rychlost'
        },
        {
            accessor: body => body.axis.tilt,
            title: 'Sklon'
        },
        {
            accessor: body => body.orbit ? body.orbit.velocity : null,
            title: 'Rychlost'
        },
        {
            accessor: body => body.temperature.outer,
            title: 'Vnější teplota',
            render: value => Units.formatTemperature(value, Units.SHORT)
        },
        {
            accessor: body => body.temperature.inner,
            title: 'Vnitřní teplota',
            render: value => Units.formatTemperature(value, Units.SHORT)
        },
        {
            accessor: body => body.discover.date,
            title: 'Objev'
        },
        {
            accessor: body => body.flattening,
            title: 'Zploštění'
        },
        {
            accessor: body => body.magnitude.relative,
            title: 'Mag.'
        },
        {
            accessor: body => body.magnitude.absolute,
            title: 'Abs. mag.'
        },
        {
            accessor: body => body.orbit ? body.orbit.velocity : null,
            title: 'Rychlost'
        },
        {
            accessor: body => body.albedo,
            title: 'Albedo'
        },
        {
            accessor: body => body.luminosity,
            title: 'Zářivost',
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
    (dispatch: IDispatch) => ({
        selectBody: bodyId => dispatch(UniverseActions.selectBody(bodyId)),
        getBodies: () => dispatch(UniverseActions.getBodies())
    })
)