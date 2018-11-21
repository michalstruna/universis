import * as ClassNames from 'classnames'
import * as React from 'react'

import AnimatedBackground from './AnimatedBackground'
import { Panel } from '../../Panel'
import { BlurLayout, StatelessComponent, Url, Queries } from '../../Utils'
import { Alert, ContextMenu, ContextTrigger, ControlPanel, ContextInfo } from '../../Controls'

interface IProps {
    isPanelVisible: boolean
}

/**
 * Root component of application.
 */
class App extends StatelessComponent<IProps> {

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
    private renderBackground(): JSX.Element {
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
    private renderForeground(): JSX.Element {
        return (
            <section className='app__foreground'>
                {this.props.children}
                <ControlPanel />
            </section>
        )
    }

    public render(): JSX.Element {
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
            </ContextTrigger>
        )
    }

}

export default App.connect(
    ({ system }: IStoreState) => ({
        isPanelVisible: system.isPanelVisible
    })
)