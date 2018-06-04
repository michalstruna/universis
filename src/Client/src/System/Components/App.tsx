import * as React from 'react'

import AnimatedBackground from './AnimatedBackground'
import { BlurLayout, SimpleComponent } from '../../Utils'
import { Alert, Context, ContextTrigger, ControlPanel } from '../../Controls'

/**
 * Root component of application.
 */
class App extends SimpleComponent {

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
            <ContextTrigger className='app'>
                <BlurLayout
                    className='app__body'
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

export default App.connect()