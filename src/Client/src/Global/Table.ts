declare type IColumnAccesor<Item> = IFunction<Item, any>
declare type IRenderColumn<Item> = IFunction2<any, Item, React.ReactNode>

declare interface IColumn<Item> {
    accessor: IColumnAccesor<Item>
    title: string
    render?: IRenderColumn<Item>
}