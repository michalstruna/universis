import * as ClassNames from 'classnames'
import * as React from 'react'

import AnimatedBackground from './AnimatedBackground'
import { Panel } from '../../Panel'
import { BlurLayout, StatelessComponent, Url, Queries } from '../../Utils'
import { Alert, ContextMenu, ContextTrigger, ControlPanel, ContextInfo } from '../../Controls'
import Sockets from '../Utils/Sockets'
import Notifications from './Notifications'

interface IProps {
    isPanelVisible: boolean
}

/**
 * Root component of application.
 */
class App extends StatelessComponent<IProps> {

    public componentDidMount(): void {
        Sockets.initialize()
    }

    /**
     * Get className of root app container.
     * @returns Class name.
     */
    private getClassName(): string {
        const { location } = this.props

        const tab = Url.getQuery(Queries.PANEL, location.search)

        return ClassNames(
            'app',
            { 'app--divided': !!tab },
            { 'app--divided-large': tab === Queries.BODY || tab === Queries.BODIES }
        )
    }

    /**
     * Render background of app.
     * @return Background.
     */
    private renderBackground(): React.ReactNode {
        return (
            <BlurLayout className='app__background' noHomePage>
                <AnimatedBackground />
            </BlurLayout>
        )
    }

    /**
     * Render foreground of app.
     * @return Foreground.
     */
    private renderForeground(): React.ReactNode {
        return (
            <section className='app__foreground'>
                {this.props.children}
                <ControlPanel />
            </section>
        )
    }

    public render(): React.ReactNode {
        return (
            <ContextTrigger className={this.getClassName()}>
                <Panel />
                <BlurLayout
                    className='app__body app__body--small'
                    visibleAlert>
                    {this.renderBackground()}
                    {this.renderForeground()}
                </BlurLayout>
                <Alert />
                <ContextMenu />
                <ContextInfo />
                <Notifications />
            </ContextTrigger>
        )
    }

}

export default App.connect(
    ({ system }: Universis.Redux.StoreState) => ({
        isPanelVisible: system.isPanelVisible
    })
)