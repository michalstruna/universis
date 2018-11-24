/**
 * Interface item of table.
 */
declare type Item = any // TODO: Generic React component?
declare type Property = any

declare type IColumnAccesor = IFunction<Item, Property>
declare type IRenderColumn = IFunction2<Property, Item, React.ReactNode>

declare interface IColumn {
    accessor: IColumnAccesor
    title: string
    render?: IRenderColumn
}