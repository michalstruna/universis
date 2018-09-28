import * as React from 'react'
import ReactTable from 'react-table'

import { SizeUnit } from '../../Universe'
import { StatelessComponent } from '../../Utils'

interface IProps {
    bodies: IAsyncEntity<ISimpleBody[]>
}

/**
 * Components for chat.
 */
class Bodies extends StatelessComponent<IProps> {

    /**
     * Render size cell.
     * @param size
     * @returns Size cell.
     */
    private renderSizeCell = (size: number, short = false) => (
        <SizeUnit input={SizeUnit.UNITS.KM} short={short}>
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
                    { id: 'name', Header: 'Název', accessor: body => (body as ISimpleBody).name },
                    { id: 'type', Header: 'Typ', accessor: body => (body as ISimpleBody).type.name },
                    {
                        id: 'diameter',
                        Header: 'Průměr',
                        accessor: body => (body as ISimpleBody).diameter.equatorial,
                        Cell: row => this.renderSizeCell(row.value)
                    },
                    {
                        id: 'mass',
                        Header: 'Hmotnost',
                        accessor: body => (body as ISimpleBody).mass,
                        Cell: row => this.renderSizeCell(row.value, true)
                    },
                    {
                        id: 'apocenter',
                        Header: 'Apocentrum',
                        accessor: body => (body as ISimpleBody).orbit.apocenter,
                        Cell: row => this.renderSizeCell(row.value, true)
                    }
                ]}
                data={bodies.payload}
                multiSort={false}
                resizable={false}
                showPagination={false}
                showPageJump={false} />
        )
    }

    public render(): JSX.Element {
        return (
            <section className='panel__bodies panel__window'>
                <section className='panel__bodies__body'>
                    <section className='panel__bodies__body--scroll'>
                        <section className='panel__bodies__body--inner'>
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
    })
)