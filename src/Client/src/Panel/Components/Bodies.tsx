import * as React from 'react'
import ReactTable from 'react-table'

import { SizeUnit, TimeUnit, UniverseActions } from '../../Universe'
import { StatelessComponent } from '../../Utils'

interface IProps {
    bodies: IAsyncEntity<ISimpleBody[]>
    selectBody: IConsumer<string>
}

/**
 * Components for chat.
 */
class Bodies extends StatelessComponent<IProps> {

    private handleClick = (bodyId: string) => {
        this.props.selectBody(bodyId)
    }

    /**
     * Render size cell.
     * @param size
     * @returns Size cell.
     */
    private renderSizeCell = (size: number) => (
        <SizeUnit input={SizeUnit.UNITS.KM} short={true}>
            {size}
        </SizeUnit>
    )

    /**
     * Render list of bodies.
     * @returns Bodies.
     */
    private renderTable(): JSX.Element {
        const { bodies } = this.props

        return (
            <ReactTable
                columns={[
                    {
                        id: 'name',
                        Header: 'Název',
                        accessor: body => (body as ISimpleBody).name,
                        minWidth: 116
                    },
                    {
                        id: 'diameter',
                        Header: 'Průměr',
                        accessor: body => (body as ISimpleBody).diameter.equatorial,
                        minWidth: 92,
                        Cell: row => this.renderSizeCell(row.value)
                    },
                    {
                        id: 'mass',
                        Header: 'Hmotnost',
                        accessor: body => (body as ISimpleBody).mass,
                        minWidth: 92,
                        Cell: row => this.renderSizeCell(row.value)
                    },
                    {
                        id: 'density',
                        Header: 'Hustota',
                        accessor: body => (body as ISimpleBody).density,
                        minWidth: 92,
                        Cell: row => this.renderSizeCell(row.value)
                    },
                    {
                        id: 'apocenter',
                        Header: 'Apo',
                        accessor: body => (body as ISimpleBody).orbit.apocenter,
                        minWidth: 92,
                        Cell: row => this.renderSizeCell(row.value)
                    },
                    {
                        id: 'year',
                        Header: 'Rok',
                        accessor: body => (body as ISimpleBody).orbit.period,
                        minWidth: 92,
                        Cell: row => <TimeUnit input={TimeUnit.UNITS.Y}>{row.value}</TimeUnit>
                    },
                    {
                        id: 'day',
                        Header: 'Den',
                        accessor: body => (body as ISimpleBody).period,
                        minWidth: 92,
                        Cell: row => <TimeUnit input={TimeUnit.UNITS.D}>{row.value}</TimeUnit>
                    }
                ]}
                defaultPageSize={bodies.payload.length}
                data={bodies.payload}
                getTrProps={(state, row) => ({
                    onClick: () => this.handleClick(row.original._id)
                })}
                multiSort={false}
                resizable={false}
                showPagination={false}
                showPageJump={false} />
        )
    }

    private renderFilter(): JSX.Element {
        return (
            <section className='panel__bodies__filter'>
                <select>
                    <option></option>
                    <option>Název</option>
                    <option>Průměr</option>
                </select>

                <select>
                    <option>Je roven</option>
                    <option>Je větší</option>
                    <option>Je menší</option>
                </select>

                než

                <input type='text' />
                <button>x</button>
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