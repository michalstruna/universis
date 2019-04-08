import * as React from 'react'

import { StatelessComponent, UILayout, Link, Url, Queries, BlurLayout } from '../../Utils'
import Overview from './Overview'
import { setTab } from '../Redux/PanelActions'
import Bodies from './Bodies'
import Body from './Body'
import QueryMenu from '../../Utils/Components/QueryMenu'

interface IProps {
    strings: Universis.Strings
    tab: string
    setTab: Universis.Consumer<string>
}

/**
 * Components for rendering intro.
 */
class Panel extends StatelessComponent<IProps> {

    public componentDidUpdate(prevProps: IProps): void {
        const { location, setTab } = this.props

        const oldTab = Url.getQuery(Queries.PANEL, (prevProps as any).location.search) // TODO: IProps extends IComponentProps
        const tab = Url.getQuery(Queries.PANEL, location.search)

        if (oldTab !== tab && tab) {
            setTab(tab)
        }
    }

    /**
     * Render button for toggle visibility of panel.
     * @returns Button.
     */
    private renderToggle(): React.ReactNode {
        const { location, tab } = this.props

        const isOpened = Url.hasQuery(Queries.PANEL, location.search)

        return (
            <UILayout>
                <Link
                    className='panel--toggle'
                    query={{ [Queries.PANEL]: isOpened ? null : tab }} />
            </UILayout>
        )
    }

    private getBodyNameFromUrl = () => (
        Url.getQuery(Queries.BODY) || 'Země' // TODO: Get from config.
    )

    /**
     * Render all tabs of chat.
     * @returns {React.ReactNode[]}
     */
    private renderMenu(): React.ReactNode {
        return (
            <QueryMenu
                query={Queries.PANEL}
                links={{
                    'Přehled': Queries.OVERVIEW,
                    'Databáze': Queries.DATABASE,
                    [this.getBodyNameFromUrl()]: Queries.BODY
                }}
                className='panel__window__menu' />
        )
    }

    /**
     * Render content of panel depends on URI.
     * @returns Content.
     */
    private renderContent(): React.ReactNode {
        const { location, tab } = this.props
        const currentTab = Url.getQuery(Queries.PANEL, location.search) || tab

        switch (currentTab) {
            case Queries.OVERVIEW:
                return <Overview />
            case Queries.DATABASE:
                return <Bodies />
            case Queries.BODY:
                return <Body />
            default:
                return null
        }
    }

    public render(): React.ReactNode {
        return (
            <BlurLayout
                className='panel'
                visibleAlert>
                <section className='panel--inner'>
                    {this.renderMenu()}
                    {this.renderContent()}
                </section>
                {this.renderToggle()}
            </BlurLayout>
        )
    }

}

export default Panel.connect(
    ({ system, panel }: Universis.Redux.StoreState) => ({
        strings: system.strings.home,
        tab: panel.tab
    }),
    { setTab }
)