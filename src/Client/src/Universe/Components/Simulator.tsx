import * as React from 'react'

import { StatelessComponent, UILayout } from '../../Utils'
import ControlBar from './ControlBar'
import ControlPanel from './ControlPanel'
import Universe from '../Utils/Universe'
import Listener from '../Utils/Listener'
import { selectBody } from '../Redux/UniverseActions'
import { ViewSizeControl } from '../../Controls'

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

/**
 * Universe simulator that contains canvas and UI.
 */
class Simulator extends StatelessComponent<IProps> {

    /**
     * Elements.
     */
    private canvasElement: HTMLElement

    /**
     * Instance of universe.
     */
    private universe: Universis.Universe

    public componentDidMount(): void {
        this.initializeUniverse()
        Listener.viewSizeElement = document.querySelector('.universe__view--inner')
        Listener.viewSizeSlider = ViewSizeControl.instance
    }

    public componentDidUpdate(prevProps: IProps): void {
        const { viewSize, selectedBody, areLabelsVisible, isLightVisible, areOrbitsVisible } = this.props

        if (!prevProps.bodies.payload) {
            this.initializeUniverse()
        }

        if (this.universe && viewSize) {
            this.universe.setViewSize(viewSize)
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
            this.universe = new Universe({
                element: this.canvasElement,
                timeElement: document.querySelector('.universe__time--inner'),
                viewSizeElement: document.querySelector('.universe__view--inner'),
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
            <section className='universe__simulator'>
                <section className='universe__space' ref={ref => this.canvasElement = ref} />
                <UILayout>
                    <section className='universe__ui'>
                        <section className='universe__ui--inner'>
                            <ControlBar />
                            <ControlPanel />
                        </section>
                    </section>
                </UILayout>
            </section>
        )
    }

}

export default Simulator.connect(
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