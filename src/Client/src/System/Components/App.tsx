import * as ClassNames from 'classnames'
import * as React from 'react'

import AnimatedBackground from './AnimatedBackground'
import { Panel } from '../../Panel'
import { BlurLayout, StatelessComponent } from '../../Utils'
import { Alert, Context, ContextTrigger, ControlPanel } from '../../Controls'

interface IProps {
    isPanelVisible: boolean
}

/**
 * Root component of application.
 */
class App extends StatelessComponent<IProps> {

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
        const { location } = this.props

        return (
            <ContextTrigger className={ClassNames('app', { 'app--divided': location.search.includes('panel') })}>
                <Panel />
                <BlurLayout
                    className='app__body app__body--small'
                    visibleAlert>
                    {this.renderBackground()}
                    {this.renderForeground()}
                </BlurLayout>
                <Alert />
                <Context />
            </ContextTrigger>
        )
    }

}

export default App.connect(
    ({ system }: IStoreState) => ({
        isPanelVisible: system.isPanelVisible
    })
)