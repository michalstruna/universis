import * as React from 'react'
import * as ReactDOM from 'react-dom'

import Universe from '../Utils/Universe'
import { StatelessComponent } from '../../Utils'
import UniverseActions from '../Redux/UniverseActions'
import Units from '../Utils/Units'

interface IProps {
    bodies: IAsyncData<ISimpleBody[]>
    getBodies: IRunnable
    changeViewSize: IConsumer<number>
    viewSize: number
}

class Canvas extends StatelessComponent<IProps> {

    /**
     * Instance of universe.
     */
    private universe: IUniverse

    public componentDidMount(): void {
        this.initializeUniverse()
    }

    public componentDidUpdate(prevProps: IProps): void {
        if (!prevProps.bodies.payload) {
            this.initializeUniverse()
        }

        if (this.universe && Units.isDifferent(prevProps.viewSize, this.props.viewSize) ) {
            this.universe.setViewSize(this.props.viewSize)
        }
    }

    /**
     * Initialize universe after load bodies.
     */
    private initializeUniverse(): void {
        const { bodies } = this.props

        if (bodies.payload && !this.universe) {
            const element = ReactDOM.findDOMNode(this.refs.space) as HTMLElement
            this.universe = new Universe(element, bodies.payload)
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

export default Canvas.connect(
    ({ universe  }: IStoreState) => ({
        bodies: universe.bodies,
        viewSize: universe.viewSize
    }),
    (dispatch: IDispatch) => ({
        changeViewSize: (zoom: number) => dispatch(UniverseActions.changeViewSize(zoom))
    })
)