import * as ClassNames from 'classnames'
import * as React from 'react'

import { StatelessComponent, UILayout, Link, Url, Queries, BlurLayout } from '../../Utils'
import Chat from './Chat'
import Overview from './Overview'
import People from './People'
import { setTab } from '../Redux/PanelActions'
import Bodies from './Bodies'
import Body from './Body'
import QueryMenu from '../../Utils/Components/QueryMenu'

interface IProps {
    strings: IStrings
    tab: string
    setTab: IConsumer<string>
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
        Url.getQuery(Queries.BODY) || 'Merkur' // TODO: Get from config.
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
                    'Aktuality': Queries.OVERVIEW,
                    'Chat': Queries.CHAT,
                    'Lidé': Queries.PEOPLE,
                    [this.getBodyNameFromUrl()]: Queries.BODY,
                    'Tělesa': Queries.BODIES
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
            case Queries.CHAT:
                return <Chat />
            case Queries.OVERVIEW:
                return <Overview />
            case Queries.PEOPLE:
                return <People />
            case Queries.BODIES:
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
    ({ system, panel }: IStoreState) => ({
        strings: system.strings.home,
        tab: panel.tab
    }),
    { setTab }
)