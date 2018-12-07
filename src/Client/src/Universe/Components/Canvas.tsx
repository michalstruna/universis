import * as React from 'react'
import * as ReactDOM from 'react-dom'

import Universe from '../Utils/Universe'
import { StatelessComponent } from '../../Utils'
import { selectBody } from '../Redux/UniverseActions'
import Units from '../Utils/Units'
import Listener from '../Utils/Listener'

interface IProps {
    bodies: IAsyncEntity<ISimpleBody[]>
    getBodies: IRunnable
    selectBody: IConsumer<string>
    viewSize: number
    selectedBody: string
    areLabelsVisible: boolean
    isLightVisible: boolean
    areOrbitsVisible: boolean
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
        const { viewSize, selectedBody, areLabelsVisible, isLightVisible, areOrbitsVisible } = this.props

        if (!prevProps.bodies.payload) {
            this.initializeUniverse()
        }

        if (this.universe && Units.isDifferent(prevProps.viewSize, viewSize)) {
            this.universe.setViewSize(this.props.viewSize)
        }

        if (this.universe && prevProps.selectedBody !== selectedBody) {
            this.universe.selectBody(selectedBody)
        }

        if (prevProps.areLabelsVisible !== areLabelsVisible) {
            this.universe.toggleLabels(areLabelsVisible)
        }

        if (prevProps.isLightVisible !== isLightVisible) {
            this.universe.toggleLight(isLightVisible)
        }

        if (prevProps.areOrbitsVisible !== areOrbitsVisible) {
            this.universe.toggleOrbits(areOrbitsVisible)
        }
    }

    /**
     * Initialize universe after load bodies.
     */
    private initializeUniverse(): void {
        const { bodies, selectBody, areLabelsVisible } = this.props

        if (bodies.payload && !this.universe) {
            const element = ReactDOM.findDOMNode(this.refs.space) as HTMLElement // TODO: Refactor ref.
            this.universe = new Universe({
                element,
                bodies: bodies.payload,
                onChangeViewSize: Listener.changeViewSizeFromSimulator,
                onSelectBody: selectBody
            })

            this.universe.toggleLabels(areLabelsVisible)
            this.setOnResize(this.universe.resize)
            Listener.updateSimulatorViewSize = this.universe.setViewSize
        }
    }

    public render(): React.ReactNode {
        return (
            <section className='universe__space' ref='space' />
        )
    }

}

export default Canvas.connect(
    ({ universe }: IStoreState) => ({
        bodies: universe.bodies,
        viewSize: universe.viewSize,
        selectedBody: universe.selectedBody,
        areLabelsVisible: universe.areLabelsVisible,
        isLightVisible: universe.isLightVisible,
        areOrbitsVisible: universe.areOrbitsVisible
    }),
    { selectBody }
)