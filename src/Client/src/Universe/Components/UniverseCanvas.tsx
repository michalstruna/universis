import * as React from 'react'
import * as ReactDOM from 'react-dom'

import Universe from '../Utils/Universe'


import { Component } from '../../Utils'

interface IProps {
    bodies: ISimpleBody[],
    getBodies: IRunnable
}

interface IState {

}

class UniverseCanvas extends Component<IProps, IState> {

    /**
     * Instance of universe.
     */
    private universe: IUniverse

    public componentDidMount(): void {
        this.initializeUniverse()
    }

    public componentDidUpdate(prevProps): void {
        if (!prevProps.bodies) {
            this.initializeUniverse()
        }
    }

    /**
     * Initialize universe after load bodies.
     */
    private initializeUniverse(): void {
        if (this.props.bodies && !this.universe) {
            const element = ReactDOM.findDOMNode(this.refs.space) as HTMLElement
            this.universe = new Universe(element, this.props.bodies)
            this.setOnResize(this.universe.resize)
        }
    }

    public render(): JSX.Element {
        return (
            <section className='universe__space' ref='space'>

            </section>
        )
    }

}

export default UniverseCanvas.connect(
    ({ universe }: any) => ({
        bodies: universe.bodies
    })
)