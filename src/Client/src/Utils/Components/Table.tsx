import * as ClassNames from 'classnames'
import * as React from 'react'

import { Component } from '../../Utils'

/**
 * Interface item of table.
 */
type Item = any // TODO: Generic React component?
type Property = any

interface IColumn {
    accessor: IFunction<Item, Property>
    name: string
    title: string
    render?: IFunction<Property, JSX.Element>
}

interface IProps {
    items: Item[]
    columns: IColumn[]
    filter?: IFunction<Item, boolean>
    onRowClick?: IConsumer<Item>
}

interface IState {
    sortColumnName: string
    isAscSort: boolean
}

/**
 * Component Table.
 */
class Table extends Component<IProps, IState> {

    public constructor(props: IProps) {
        super(props)

        this.state = {
            sortColumnName: props.columns[0].name,
            isAscSort: true
        }
    }

    public static defaultProps = {
        filter: item => true,
        onRowClick: item => null
    }

    /**
     * Handle change sort.
     * @param columnName Name of sorted column.
     */
    private handleChangeSort = (columnName: string) => {
        const { sortColumnName, isAscSort } = this.state

        this.setState({
            sortColumnName: columnName,
            isAscSort: columnName === sortColumnName ? !isAscSort : true
        })
    }

    /**
     * Sort items and return them.
     * @param items List of items.
     */
    private sort = (items: Item[]): Item[] => {
        const { columns } = this.props
        const { isAscSort, sortColumnName } = this.state

        const column = columns.filter(column => column.name === sortColumnName)[0]
        const ascCoeficient = isAscSort ? 1 : -1

        return items.sort((item1, item2) => {
            const property1 = column.accessor(item1)
            const property2 = column.accessor(item2)

            if (property1 < property2) {
                return -ascCoeficient
            } else if (property1 > property2) {
                return ascCoeficient
            } else {
                return 0
            }
        })
    }

    /**
     * Render header row.
     * @returns Header cells.
     */
    private renderHeader(): JSX.Element[] {
        const { columns } = this.props
        const { sortColumnName, isAscSort } = this.state

        return columns.map((column, key) => (
            <section
                className={ClassNames(
                    'table__cell',
                    { 'table__cell--asc': sortColumnName === column.name && isAscSort },
                    { 'table__cell--desc': sortColumnName === column.name && !isAscSort }
                )}
                key={key}
                onClick={() => this.handleChangeSort(column.name)}>
                {column.title}
            </section>
        ))
    }

    /**
     * Render columns in row.
     * @param item Item data.
     * @returns Item cells.
     */
    private renderItem(item: Item): JSX.Element[] {
        const { columns } = this.props

        return columns.map((column, key) => (
            <section className='table__cell' key={key}>
                {column.render ? column.render(column.accessor(item)) : column.accessor(item)}
            </section>
        ))
    }

    /**
     * Render rows.
     * @returns Rows.
     */
    private renderItems(): JSX.Element[] {
        const { items, filter, onRowClick } = this.props

        const filteredItems = items.filter(filter)
        const sortedItems = this.sort(filteredItems)

        return sortedItems.map((item, key) => (
            <section
                className='table__row'
                onClick={() => onRowClick(item)}
                key={key}>
                {this.renderItem(item)}
            </section>
        ))
    }

    public render(): JSX.Element {
        return (
            <section className='table'>
                <section className='table__row table__row--header'>
                    {this.renderHeader()}
                </section>
                {this.renderItems()}
            </section>
        )
    }

}

export default Table