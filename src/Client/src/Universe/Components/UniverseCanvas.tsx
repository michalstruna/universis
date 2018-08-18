import * as React from 'react'
import * as ReactDOM from 'react-dom'

import Universe from '../Utils/Universe'


import { Component } from '../../Utils'
import UniverseActions from '../Redux/UniverseActions'

interface IProps {
    bodies: ISimpleBody[],
    getBodies: IRunnable,
    changeCameraZoom: IConsumer<number>
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

            this.universe = new Universe(element, this.props.bodies, data => {
                this.props.changeCameraZoom(Math.log10(data.cameraZoom * 1000000))
            })

            this.setOnResize(this.universe.resize)
        }
    }

    public render(): JSX.Element {
        return (
            <section className='universe__space' ref='space' />
        )
    }

}

export default UniverseCanvas.connect(
    ({ universe }: any) => ({
        bodies: universe.bodies
    }),
    (dispatch: any) => ({
        changeCameraZoom: (zoom: number) => dispatch(UniverseActions.changeCameraZoom(zoom))
    })
)