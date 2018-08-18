import * as React from 'react'
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'

import { UniverseActions } from '../../Universe'
import { StatelessComponent, Event } from '../../Utils'

export interface IProps {
    zoom: number
    labels: Map<number, string>,
    changeZoom: IConsumer<number>
}

/**
 * Component for toggle full screen.
 */
class ZoomSliderControl extends StatelessComponent<IProps> {

    public render(): JSX.Element {
        const { changeZoom, labels, zoom } = this.props
        const sizes = Object.keys(labels)

        return (
            <section
                className={'control control--zoom-slider'}
                {...Event.getReactStopPropagationProps()}>
                <Slider
                    min={parseFloat(sizes[0])}
                    max={parseFloat(sizes[sizes.length - 1])}
                    orientation='vertical'
                    step={0.01}
                    value={Math.floor(100 * (parseFloat(sizes[sizes.length - 1]) - zoom)) / 100}
                    labels={labels}
                    tooltip={false}
                    onChange={changeZoom} />
            </section>
        )
    }
}

export default ZoomSliderControl.connect(({ universe, system }: any) => ({
    zoom: universe.cameraZoom,
    labels: system.strings.controls.zoomSlider
}), (dispatch: any) => ({
    changeZoom: (zoom: number) => dispatch(UniverseActions.changeCameraZoom(zoom))
}))