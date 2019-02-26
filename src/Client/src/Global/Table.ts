declare type IColumnAccesor<Item> = Universis.Function<Item, any>
declare type IRenderColumn<Item> = Universis.Function2<any, Item, React.ReactNode>

declare interface IColumn<Item> {
    accessor: IColumnAccesor<Item>
    title: string
    render?: IRenderColumn<Item>
}