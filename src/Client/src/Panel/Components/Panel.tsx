import * as ClassNames from 'classnames'
import * as React from 'react'

import { StatelessComponent, UILayout, Link, Url, Queries } from '../../Utils'
import Chat from './Chat'
import PanelActions from '../Redux/PanelActions'

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

        let newSearch

        if (Url.hasQuery(location.search, Queries.PANEL)) {
            newSearch = Url.removeQuery(location.search, Queries.PANEL)
        } else {
            newSearch = Url.setQuery(location.search, Queries.PANEL, tab)
        }

        return (
            <UILayout>
                <Link className='panel--toggle' target={{ search: newSearch }} />
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
            { label: 'Přehled', target: Queries.OVERVIEW },
            { label: 'Chat', target: Queries.CHAT },
            { label: 'Nápověda', target: Queries.HELP }
        ]

        const currentTab = Url.getQuery(location.search, Queries.PANEL)

        return tabs.map((tab, key) => (
            <Link
                key={key}
                target={{ search: Url.setQuery(location.search, Queries.PANEL, tab.target) }}
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
            default:
                return null
        }
    }

    public render(): JSX.Element {
        return (
            <section className='panel'>
                <section className='panel--inner'>
                    <section className='panel__tabs'>
                        {this.renderTabs()}
                    </section>
                    {this.renderContent()}
                </section>
                {this.renderToggle()}
            </section>
        )
    }

}

export default Panel.connect(
    ({ system, panel }: IStoreState) => ({
        strings: system.strings.home,
        tab: panel.panelTab
    }),
    (dispatch: IDispatch) => ({
        setTab: (tab: string) => dispatch(PanelActions.setTab(tab))
    })
)