import * as React from 'react'

import BodyFilterForm from './BodyFilterForm'
import { SizeUnit, TimeUnit, MassUnit, UniverseActions, Units } from '../../Universe'
import { StatelessComponent, Table, Filter, AsyncEntity, Url } from '../../Utils'

interface IProps {
    bodies: IAsyncEntity<ISimpleBody[]>
    selectBody: IConsumer<string>
    filter: IFilter
    getBodies: IRunnable
}

/**
 * Components for chat.
 */
class Bodies extends StatelessComponent<IProps> {

    /**
     * List of all columns in table.
     * // TODO: Dynamic columns?
     */
    private static readonly COLUMNS = [
        {
            accessor: body => body.name,
            title: 'Název',
        },
        {
            accessor: body => body.diameter.x,
            title: 'Průměr',
            render: diameter => <SizeUnit input={SizeUnit.UNITS.KM} short={true}>{diameter}</SizeUnit>
        },
        {
            accessor: body => body.mass,
            title: 'Hmotnost',
            render: mass => <MassUnit>{mass}</MassUnit>
        },
        {
            accessor: body => body.density,
            title: 'Hustota',
            render: density => Units.formatDensity(density)
        },
        {
            accessor: body => body.orbit ? body.orbit.apocenter : null,
            title: 'Apocentrum',
            render: apocenter => <SizeUnit input={SizeUnit.UNITS.KM} short={true}>{apocenter}</SizeUnit>
        },
        {
            accessor: body => body.orbit ? body.orbit.pericenter : null,
            title: 'Pericentrum',
            render: pericenter => <SizeUnit input={SizeUnit.UNITS.KM} short={true}>{pericenter}</SizeUnit>
        },
        {
            accessor: body => body.orbit ? body.orbit.eccentricity : null,
            title: 'Excentricita'
        },
        {
            accessor: body => body.orbit ? body.orbit.period : null,
            title: 'Rok',
            render: period => period ? <TimeUnit input={TimeUnit.UNITS.Y} short={true}>{period}</TimeUnit> : null
        },
        {
            accessor: body => body.period,
            title: 'Den',
            render: period => period ? <TimeUnit input={TimeUnit.UNITS.D} short={true}>{period}</TimeUnit> : null
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
            accessor: body => body.orbit ? body.orbit.speed : null,
            title: 'Rychlost'
        },
        {
            accessor: body => body.temperature.outer,
            title: 'Vnější teplota',
            render: value => Units.formatTemperature(value)
        },
        {
            accessor: body => body.temperature.inner,
            title: 'Vnitřní teplota',
            render: value => Units.formatTemperature(value)
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
            render: luminosity => Units.formatLuminosity(luminosity)
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
                            columns={Bodies.COLUMNS}
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
    ({ universe }: IStoreState) => ({
        bodies: universe.bodies
    }),
    (dispatch: IDispatch) => ({
        selectBody: bodyId => dispatch(UniverseActions.selectBody(bodyId)),
        getBodies: () => dispatch(UniverseActions.getBodies())
    })
)