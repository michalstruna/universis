import * as React from 'react'
import * as ReactDOM from 'react-dom'

import Universe from '../Utils/Universe'
import { Component } from '../../Utils'
import UniverseActions from '../Redux/UniverseActions'
import Units from '../Utils/Units'

interface IProps {
    bodies: ISimpleBody[]
    getBodies: IRunnable
    changeViewSize: IConsumer<number>
    viewSize: number
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

    public componentDidUpdate(prevProps: IProps): void {
        if (!prevProps.bodies) {
            this.initializeUniverse()
        }

        if (Units.isDifferent(prevProps.viewSize, this.props.viewSize) ) {
            this.universe.setViewSize(this.props.viewSize)
        }
    }

    /**
     * Initialize universe after load bodies.
     */
    private initializeUniverse(): void {
        if (this.props.bodies && !this.universe) {
            const element = ReactDOM.findDOMNode(this.refs.space) as HTMLElement
            this.universe = new Universe(element, this.props.bodies)
            this.universe.setOnChangeViewSize(this.handleChangeViewSize)
            this.setOnResize(this.universe.resize)
        }
    }

    private handleChangeViewSize = (viewSize: number) => {
        this.props.changeViewSize(viewSize)
    }

    public render(): JSX.Element {
        return (
            <section className='universe__space' ref='space' />
        )
    }

}

export default UniverseCanvas.connect(
    ({ universe }: any) => ({
        bodies: universe.bodies,
        viewSize: universe.viewSize
    }),
    (dispatch: any) => ({
        changeViewSize: (zoom: number) => dispatch(UniverseActions.changeViewSize(zoom))
    })
)