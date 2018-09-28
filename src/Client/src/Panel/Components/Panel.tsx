import * as ClassNames from 'classnames'
import * as React from 'react'

import { StatelessComponent, UILayout, Link, Url, Queries, BlurLayout } from '../../Utils'
import Chat from './Chat'
import Overview from './Overview'
import People from './People'
import PanelActions from '../Redux/PanelActions'
import Bodies from './Bodies'

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

        const oldTab = Url.getQuery((prevProps as any).location.search, Queries.PANEL) // TODO: IProps extends IComponentProps
        const tab = Url.getQuery(location.search, Queries.PANEL)

        if (oldTab !== tab && tab) {
            setTab(tab)
        }

    }

    /**
     * Render button for toggle visibility of panel.
     * @returns Button.
     */
    private renderToggle(): JSX.Element {
        const { location, tab } = this.props

        const isOpened = Url.hasQuery(location.search, Queries.PANEL)

        return (
            <UILayout>
                <Link
                    className='panel--toggle'
                    query={{ [Link.QUERIES.PANEL]: isOpened ? null : tab }} />
            </UILayout>
        )
    }

    /**
     * Render all tabs of chat.
     * @returns {JSX.Element[]}
     */
    private renderTabs(): JSX.Element[] {
        const { location } = this.props

        const tabs = [
            { label: 'Aktuality', target: Queries.OVERVIEW },
            { label: 'Chat', target: Queries.CHAT },
            { label: 'Lidé', target: Queries.PEOPLE },
            { label: 'Merkur', target: Queries.BODY },
            { label: 'Tělesa', target: Queries.BODIES }
        ]

        const currentTab = Url.getQuery(location.search, Queries.PANEL)

        return tabs.map((tab, key) => (
            <Link
                key={key}
                query={{ [Link.QUERIES.PANEL]: tab.target }}
                className={ClassNames('panel__tabs__tab', { 'panel__tabs__tab--selected': currentTab === tab.target })}>
                {tab.label}
            </Link>
        ))
    }

    /**
     * Render content of panel depends on URI.
     * @returns Content.
     */
    private renderContent(): JSX.Element {
        const { location, tab } = this.props
        const currentTab = Url.getQuery(location.search, Queries.PANEL) || tab

        switch (currentTab) {
            case Queries.CHAT:
                return <Chat />
            case Queries.OVERVIEW:
                return <Overview />
            case Queries.PEOPLE:
                return <People />
            case Queries.BODIES:
                return <Bodies />
            default:
                return null
        }
    }

    public render(): JSX.Element {
        return (
            <BlurLayout
                className='panel'
                visibleAlert>
                <section className='panel--inner'>
                    <section className='panel__tabs'>
                        {this.renderTabs()}
                    </section>
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
    (dispatch: IDispatch) => ({
        setTab: (tab: string) => dispatch(PanelActions.setTab(tab))
    })
)