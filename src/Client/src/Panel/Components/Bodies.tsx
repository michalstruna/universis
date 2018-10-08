import * as React from 'react'

import BodyFilterForm from './BodyFilterForm'
import { SizeUnit, TimeUnit, UniverseActions } from '../../Universe'
import { StatelessComponent, Table } from '../../Utils'

interface IProps {
    bodies: IAsyncEntity<ISimpleBody[]>
    selectBody: IConsumer<string>
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
            title: 'Apo',
            render: apocenter => <SizeUnit input={SizeUnit.UNITS.KM} short={true}>{apocenter}</SizeUnit>
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
        }
    ]

    private handleClick = (bodyId: string) => {
        this.props.selectBody(bodyId)
    }

    /**
     * Render list of bodies.
     * @returns Bodies.
     */
    private renderTable(): JSX.Element {
        const { bodies, selectBody } = this.props

        if (!bodies.payload) {
            return null
        }

        return (
            <Table
                columns={Bodies.COLUMNS}
                items={bodies.payload}
                onSort={(column, isAsc) => console.log(column, isAsc)}
                onRowClick={(body: ISimpleBody) => selectBody(body._id)} />
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
                    <section className='panel__bodies--scroll'>
                        {this.renderFilter()}
                        <section className='panel__bodies--inner'>
                            {this.renderTable()}
                        </section>
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
        selectBody: bodyId => dispatch(UniverseActions.selectBody(bodyId))
    })
)