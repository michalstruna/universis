import * as ClassNames from 'classnames'
import * as React from 'react'

import { Component } from '../../Utils'

interface IState {
    sort: number
    reverse: boolean
}

interface IProps<Item> {

    /**
     * List of items.
     */
    items: Item[]

    /**
     *
     */
    columns: IColumn<Item>[]

    /**
     * Handler for click on row.
     * There is clicked item in consumer parameter.
     */
    onRowClick?: IConsumer<Item>

    /**
     * Handler for change sorting.
     * THere is index of sorted column and direction in consumer parameter.
     */
    onSort?: IConsumer2<number, boolean>

    /**
     * Index of column which will be sorted.
     */
    sort?: number

    /**
     * Sorting will be descending.
     */
    reverse?: boolean
}

/**
 * Component Table.
 * @template Item Rendered item type.git pull
 */
class Table<Item> extends Component<IProps<Item>, IState> {

    public constructor(props: IProps<Item>) {
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
        const sortValue = reverse ? -1 : 1

        return items.sort((item1, item2) => {
            const property1 = column.accessor(item1)
            const property2 = column.accessor(item2)

            if (property1 < property2) {
                return -sortValue
            } else if (property1 > property2) {
                return sortValue
            } else {
                return 0
            }
        })
    }

    /**
     * Render header row.
     * @returns Header cells.
     */
    private renderHeader(): React.ReactNode[] {
        const { columns } = this.props
        const { sort, reverse } = this.state

        return columns.map((column, key) => (
            <section
                className={ClassNames(
                    'table__cell',
                    { 'table__cell--asc': sort === key && !reverse },
                    { 'table__cell--desc': sort === key && reverse }
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
    private renderItem(item: Item): React.ReactNode[] {
        const { columns } = this.props

        // TODO: Refactor.

        return columns.map((column, key) => (
            <section className='table__cell' key={key}>
                {
                    column.render &&
                    column.accessor(item) !== null &&
                    column.accessor(item) !== undefined ? column.render(column.accessor(item), item) : column.accessor(item)}
            </section>
        ))
    }

    /**
     * Render rows.
     * @returns Rows.
     */
    private renderItems(): React.ReactNode[] {
        const { items, onRowClick } = this.props

        const sortedItems = this.sort(items)

        return sortedItems.map((item, key) => (
            <section
                className='table__row'
                onClick={() => onRowClick(item)}
                key={key}>
                {this.renderItem(item)}
            </section>
        ))
    }

    public render(): React.ReactNode {
        return (
            <section className='table'>
                <section className='table__row table__row--header'>
                    {this.renderHeader()}
                </section>
                <section className='table__body'>
                    {this.renderItems()}
                </section>
            </section>
        )
    }

}

export default Table