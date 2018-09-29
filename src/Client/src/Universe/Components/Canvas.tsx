import * as React from 'react'
import * as ReactDOM from 'react-dom'

import Universe from '../Utils/Universe'
import { StatelessComponent } from '../../Utils'
import UniverseActions from '../Redux/UniverseActions'
import Units from '../Utils/Units'

interface IProps {
    bodies: IAsyncEntity<ISimpleBody[]>
    getBodies: IRunnable
    onChangeViewSize: IConsumer<number>
    onSelectBody: IConsumer<string>
    viewSize: number
    selectedBody: string
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
        const { viewSize, selectedBody } = this.props

        if (!prevProps.bodies.payload) {
            this.initializeUniverse()
        }

        if (this.universe && Units.isDifferent(prevProps.viewSize, viewSize)) {
            this.universe.setViewSize(this.props.viewSize)
        }

        console.log(prevProps.selectedBody, selectedBody)

        if (this.universe && prevProps.selectedBody !== selectedBody) {
            this.universe.selectBody(selectedBody)
        }
    }

    /**
     * Initialize universe after load bodies.
     */
    private initializeUniverse(): void {
        const { bodies, onChangeViewSize, onSelectBody } = this.props

        if (bodies.payload && !this.universe) {
            const element = ReactDOM.findDOMNode(this.refs.space) as HTMLElement
            this.universe = new Universe({
                element,
                bodies: bodies.payload,
                onChangeViewSize,
                onSelectBody,
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

export default Canvas.connect(
    ({ universe }: IStoreState) => ({
        bodies: universe.bodies,
        viewSize: universe.viewSize,
        selectedBody: universe.selectedBody
    }),
    (dispatch: IDispatch) => ({
        onChangeViewSize: (zoom: number) => dispatch(UniverseActions.changeViewSize(zoom)),
        onSelectBody: (bodyId: string) => dispatch(UniverseActions.selectBody(bodyId))
    })
)