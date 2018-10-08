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
    title: string
    render?: IFunction<Property, JSX.Element>
}

interface IProps {
    items: Item[]
    columns: IColumn[]
    filter?: IFunction<Item, boolean>
    onRowClick?: IConsumer<Item>
    onSort?: IConsumer2<number, boolean>
    sort?: number
    reverse?: boolean
}

interface IState {
    sort: number
    reverse: boolean
}

/**
 * Component Table.
 */
class Table extends Component<IProps, IState> {

    public constructor(props: IProps) {
        super(props)

        this.state = {
            sort: props.sort,
            reverse: props.reverse
        }
    }

    public static defaultProps = {
        filter: item => true,
        onRowClick: item => null,
        onSort: (index, reverse) => null,
        sort: 0,
        reverse: false
    }

    /**
     * Handle change sort.
     * @param index Index of column.
     */
    private handleChangeSort = (index: number) => {
        const { sort, reverse } = this.state

        this.setState({
            sort: index,
            reverse: sort === index ? !reverse : true
        }, () => {
            const { onSort } = this.props
            const { sort, reverse } = this.state
            onSort(sort, reverse)
        })
    }

    /**
     * Sort items and return them.
     * @param items List of items.
     */
    private sort = (items: Item[]): Item[] => {
        const { columns } = this.props
        const { reverse, sort } = this.state

        const column = columns[sort]
        const isAsc = reverse ? -1 : 1

        return items.sort((item1, item2) => {
            const property1 = column.accessor(item1)
            const property2 = column.accessor(item2)

            if (property1 < property2) {
                return -isAsc
            } else if (property1 > property2) {
                return isAsc
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
        const { sort, reverse } = this.state

        return columns.map((column, key) => (
            <section
                className={ClassNames(
                    'table__cell',
                    { 'table__cell--asc': sort === key && reverse },
                    { 'table__cell--desc': sort === key && !reverse }
                )}
                key={key}
                onClick={() => this.handleChangeSort(key)}>
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