import * as ClassNames from 'classnames'
import * as React from 'react'

import { StatelessComponent, UILayout } from '../../Utils'
import ControlBar from './ControlBar'
import ControlPanel from './ControlPanel'
import Universe from '../Utils/Universe'
import Listener from '../Utils/Listener'
import { selectBody } from '../Redux/UniverseActions'
import { ViewSizeControl } from '../../Controls'

interface IProps {
    bodies: Universis.Redux.AsyncEntity<Universis.Universe.Body.Simple[]>
    getBodies: Universis.Runnable
    selectBody: Universis.Consumer<string>
    viewSize: number
    selectedBody: string
    isNameVisible: boolean
    isLightVisible: boolean
    areOrbitsVisible: boolean
    isVelocityVisible: boolean
    isFromEarthVisible: boolean
    isFromCameraVisible: boolean
    isFromCenterVisible: boolean
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
        const { viewSize, selectedBody, isNameVisible, isLightVisible, areOrbitsVisible } = this.props

        if (!prevProps.bodies.payload) {
            this.initializeUniverse()
        }

        if (this.universe && viewSize) {
            this.universe.setViewSize(viewSize)
        }

        if (this.universe && prevProps.selectedBody !== selectedBody) {
            this.universe.selectBody(selectedBody)
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
        const { bodies, selectBody } = this.props

        if (bodies.payload && !this.universe) {
            this.universe = new Universe({
                element: this.canvasElement,
                timeElement: document.querySelector('.universe__time--inner'),
                viewSizeElement: document.querySelector('.universe__view--inner'),
                bodies: bodies.payload,
                onChangeViewSize: Listener.changeViewSizeFromSimulator,
                onSelectBody: selectBody
            })

            this.setOnResize(this.universe.resize)
            Listener.updateSimulatorViewSize = this.universe.setViewSize
        }
    }

    public render(): React.ReactNode {
        const { isVelocityVisible, isNameVisible, isFromCameraVisible, isFromCenterVisible, isFromEarthVisible } = this.props

        return (
            <section className={ClassNames(
                'universe__simulator',
                { 'universe__simulator--velocity': isVelocityVisible },
                { 'universe__simulator--name': isNameVisible },
                { 'universe__simulator--earth': isFromEarthVisible },
                { 'universe__simulator--camera': isFromCameraVisible },
                { 'universe__simulator--center': isFromCenterVisible }
            )}>
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
    ({ universe }: Universis.Redux.StoreState) => ({
        bodies: universe.bodies,
        viewSize: universe.viewSize,
        selectedBody: universe.selectedBody,
        isNameVisible: universe.isNameVisible,
        isLightVisible: universe.isLightVisible,
        areOrbitsVisible: universe.areOrbitsVisible,
        isVelocityVisible: universe.isVelocityVisible,
        isFromEarthVisible: universe.isFromEarthVisible,
        isFromCameraVisible: universe.isFromCameraVisible,
        isFromCenterVisible: universe.isFromCenterVisible
    }),
    { selectBody }
)