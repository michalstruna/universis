import * as React from 'react'

import { Component } from '../../Utils'

interface IProps {

}

interface IState {

}

/**
 * Root component of application.
 */
class App extends Component<IProps, IState> {

    public render(): JSX.Element {
        return (
            <section className='app'>
                {this.props.children}
            </section>
        )
    }

}

export default App.connect()