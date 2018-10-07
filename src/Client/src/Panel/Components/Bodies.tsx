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

    private handleClick = (bodyId: string) => {
        this.props.selectBody(bodyId)
    }

    /**
     * Render list of bodies.
     * @returns Bodies.
     */
    private renderTable(): JSX.Element {
        const { bodies } = this.props

        if (!bodies.payload) {
            return null
        }

        return (
            <Table
                columns={
                    [
                        {
                            accessor: body => body.name,
                            name: 'name',
                            title: 'Název',
                        },
                        {
                            accessor: body => body.diameter.equatorial,
                            name: 'diameter',
                            title: 'Průměr',
                            render: diameter => <SizeUnit input={SizeUnit.UNITS.KM} short={true}>{diameter}</SizeUnit>
                        },
                        {
                            accessor: body => body.mass,
                            name: 'mass',
                            title: 'Hmotnost',
                            render: mass => <SizeUnit input={SizeUnit.UNITS.KM} short={true}>{mass}</SizeUnit>
                        },
                        {
                            accessor: body => body.mass,
                            name: 'density',
                            title: 'Hustota',
                            render: density => <SizeUnit input={SizeUnit.UNITS.KM} short={true}>{density}</SizeUnit>
                        },
                        {
                            accessor: body => body.orbit.apocenter,
                            name: 'apocenter',
                            title: 'Apo',
                            render: apocenter => <SizeUnit input={SizeUnit.UNITS.KM} short={true}>{apocenter}</SizeUnit>
                        },
                        {
                            accessor: body => body.orbit.period,
                            name: 'year',
                            title: 'Rok',
                            render: period => <TimeUnit input={TimeUnit.UNITS.Y} short={true}>{period}</TimeUnit>
                        },
                        {
                            accessor: body => body.period,
                            name: 'day',
                            title: 'Den',
                            render: period => <TimeUnit input={TimeUnit.UNITS.D} short={true}>{period}</TimeUnit>
                        }
                    ]
                }

                items={bodies.payload}
            />
        )

        // TODO: Own react table because of change count of rows.
        /*
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
                                Cell: row => <SizeUnit input={SizeUnit.UNITS.KM} short={true}>{row.value}</SizeUnit>
                            },
                            {
                                id: 'mass',
                                Header: 'Hmotnost',
                                accessor: body => (body as ISimpleBody).mass,
                                minWidth: 92,
                                Cell: row => <SizeUnit input={SizeUnit.UNITS.KM} short={true}>{row.value}</SizeUnit>
                            },
                            {
                                id: 'density',
                                Header: 'Hustota',
                                accessor: body => (body as ISimpleBody).density,
                                minWidth: 92,
                                Cell: row => <SizeUnit input={SizeUnit.UNITS.KM} short={true}>{row.value}</SizeUnit>
                            },
                            {
                                id: 'apocenter',
                                Header: 'Apo',
                                accessor: body => (body as ISimpleBody).orbit.apocenter,
                                minWidth: 92,
                                Cell: row => <SizeUnit input={SizeUnit.UNITS.KM} short={true}>{row.value}</SizeUnit>
                            },
                            {
                                id: 'year',
                                Header: 'Rok',
                                accessor: body => (body as ISimpleBody).orbit.period,
                                minWidth: 92,
                                Cell: row => <TimeUnit input={TimeUnit.UNITS.Y} short={true}>{row.value}</TimeUnit>
                            },
                            {
                                id: 'day',
                                Header: 'Den',
                                accessor: body => (body as ISimpleBody).period,
                                minWidth: 92,
                                Cell: row => <TimeUnit input={TimeUnit.UNITS.D} short={true}>{row.value}</TimeUnit>
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
                )*/
    }

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