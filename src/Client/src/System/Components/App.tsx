import * as React from 'react'

import AnimatedBackground from './AnimatedBackground'
import { Component } from '../../Utils'

interface IProps {

}

interface IState {

}

/**
 * Root component of application.
 */
class App extends Component<IProps, IState> {

    /**
     * Render background of app.
     * @return Background.
     */
    private renderBackground(): JSX.Element {
        return (
            <section className='app__background'>
                <AnimatedBackground />
            </section>
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
            </section>
        )
    }

    public render(): JSX.Element {
        return (
            <section className='app'>
                {this.renderBackground()}
                {this.renderForeground()}
            </section>
        )
    }

}

export default App.connect()