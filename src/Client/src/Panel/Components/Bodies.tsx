import * as React from 'react'

import BodyFilterForm from './BodyFilterForm'
import { SizeUnit, TimeUnit, UniverseActions } from '../../Universe'
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
            accessor: body => body.diameter.equatorial,
            title: 'Průměr',
            render: diameter => <SizeUnit input={SizeUnit.UNITS.KM} short={true}>{diameter}</SizeUnit>
        },
        {
            accessor: body => body.mass,
            title: 'Hmotnost',
            render: mass => <SizeUnit input={SizeUnit.UNITS.KM} short={true}>{mass}</SizeUnit>
        },
        {
            accessor: body => body.mass,
            title: 'Hustota',
            render: density => <SizeUnit input={SizeUnit.UNITS.KM} short={true}>{density}</SizeUnit>
        },
        {
            accessor: body => body.orbit.apocenter,
            title: 'Apocentrum',
            render: apocenter => <SizeUnit input={SizeUnit.UNITS.KM} short={true}>{apocenter}</SizeUnit>
        },
        {
            accessor: body => body.orbit.pericenter,
            title: 'Pericentrum',
            render: pericenter => <SizeUnit input={SizeUnit.UNITS.KM} short={true}>{pericenter}</SizeUnit>
        },
        {
            accessor: body => body.orbit.eccentricity,
            title: 'Excentricita'
        },
        {
            accessor: body => body.orbit.period,
            title: 'Rok',
            render: period => <TimeUnit input={TimeUnit.UNITS.Y} short={true}>{period}</TimeUnit>
        },
        {
            accessor: body => body.period,
            title: 'Den',
            render: period => <TimeUnit input={TimeUnit.UNITS.D} short={true}>{period}</TimeUnit>
        },
        {
            accessor: body => body.rings.length,
            title: 'Satelitů'
        },
        {
            accessor: body => body.rings.length,
            title: 'Prstenců'
        },
        {
            accessor: body => body.tilt,
            title: 'Sklon'
        },
        {
            accessor: body => body.orbit.speed || 123,
            title: 'Rychlost'
        },
        {
            accessor: body => body.rings.length,
            title: 'Povrch'
        },
        {
            accessor: body => body.rings.length,
            title: 'Jádro'
        },
        {
            accessor: body => '1997',
            title: 'Objev'
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