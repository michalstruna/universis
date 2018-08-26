import * as React from 'react'
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'

import { UniverseActions, Units } from '../../Universe'
import { StatelessComponent } from '../../Utils'

export interface IProps {
    viewSize: number
    labels: Map<number, string>,
    changeViewSize: IConsumer<number>
}

/**
 * Component for toggle full screen.
 */
class ViewSizeControl extends StatelessComponent<IProps> {

    /**
     * Reverse slider value.
     * @param value Slider value.
     * @returns Real value.
     */
    private reverseValue(value: number): number {
        const { labels } = this.props
        const sizes = Object.keys(labels)

        return Math.floor(100 * (parseFloat(sizes[sizes.length - 1]) - value)) / 100
    }

    public render(): JSX.Element {
        const { changeViewSize, labels, viewSize } = this.props
        const sizes = Object.keys(labels)

        return (
            <section className={'control control--view-size'}>
                <Slider
                    min={parseFloat(sizes[0])}
                    max={parseFloat(sizes[sizes.length - 1])}
                    orientation='vertical'
                    step={0.01}
                    value={this.reverseValue(Math.log10(Units.convert(Units.SIZE.KM, Units.SIZE.M, viewSize)))}
                    labels={labels}
                    tooltip={false}
                    onChange={viewSize => changeViewSize(Units.convert(Units.SIZE.M, Units.SIZE.KM, Math.pow(10, this.reverseValue(viewSize))))} />
            </section>
        )
    }
}

export default ViewSizeControl.connect(({ universe, system }: IStoreState) => ({
    viewSize: universe.viewSize,
    labels: system.strings.controls.viewSize
}), (dispatch: IDispatch) => ({
    changeViewSize: (viewSize: number) => dispatch(UniverseActions.changeViewSize(viewSize))
}))