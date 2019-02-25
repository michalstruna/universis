import * as React from 'react'

import StatelessComponent from './StatelessComponent'

interface IProps {
    title?: string
    data: IObject<any>
}

/**
 * Two-layout table for pair (property -> value).
 */
class DataTable extends StatelessComponent<IProps> {

    /**
     * Return flex row.
     * @returns {React.ReactNode}
     * @constructor
     */
    public static FlexRow = ({ children }): React.ReactNode => {
        return (
            <section className='data-table__row--flex'>
                {children.map((item, key) => (
                    <section className='data-table__cell' key={key}>
                        {item}
                    </section>
                ))}
            </section>
        )
    }

    private renderTitle(): React.ReactNode {
        const { title } = this.props

        if (!title) {
            return null
        }

        return (
            <section className='data-table__row'>
                <section className='data-table__cell data-table__cell--title'>
                    {title}
                </section>
            </section>
        )
    }


    private renderData(): React.ReactNode {
        const { data } = this.props

        return Object.keys(data).map((column, key) => (
            <section className='data-table__row' key={key}>
                {this.renderRow(column)}
            </section>
        ))
    }

    private renderRow(column: string): React.ReactNode {
        const { data } = this.props

        if (typeof data[column] === 'function') {
            return (
                <section className='data-table__cell--custom'>
                    <span className='data-table__cell--center'>
                        {column}
                    </span>
                    {data[column]()}
                </section>
            )
        }

        return (
            <>
                <section className='data-table__cell'>
                    {column}
                </section>
                <section className='data-table__cell'>
                    {data[column]}
                </section>
            </>
        )
    }

    public render(): React.ReactNode {
        return (
            <section className='data-table'>
                {this.renderTitle()}
                {this.renderData()}
            </section>
        )
    }

}

export default DataTable.connect()