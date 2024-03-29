import * as React from 'react'
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'

import { Listener } from '../../Universe'
import { Component, Url, Urls, Units } from '../../Utils'
import { history } from '../../'

interface IProps {

}

interface IState {
    viewSize: number
}

const labels = {
    0: 'Tly',
    [27.98 - 24.98]: 'Gly',
    [27.98 - 21.98]: 'Mly',
    [27.98 - 18.98]: 'kly',
    [27.98 - 15.98]: 'ly',
    [27.98 - 11.17]: 'AU',
    [27.98 - 3]: 'km',
    27.98: 'm'
}

/**
 * Component for toggle full screen.
 */
class ViewSizeControl extends Component<IProps, IState> {

    /**
     * Current instance of view size control.
     */
    public static instance: React.Component

    public constructor(props) {
        super(props)

        this.state = {
            viewSize: 0
        }

        ViewSizeControl.instance = this
    }

    /**
     * Reverse slider value.
     * @param value Slider value.
     * @returns Real value.
     */
    private reverseValue(value: number): number {
        const sizes = Object.keys(labels)
        return Math.floor(100 * (parseFloat(sizes[sizes.length - 1]) - value)) / 100
    }

    /**
     * On change UI, change simulator also.
     * @param viewSize New view size.
     */
    private handleChange = (viewSize: number) => {
        const newViewSize = Units.convert(Units.SIZE.M, Units.SIZE.KM, Math.pow(10, this.reverseValue(viewSize)))
        let newValue

        this.unsetInterval()

        const innerHandleChange = (value: number) => {
            if (value > this.state.viewSize) {
                newValue = Math.min(value, this.state.viewSize * 1.2)
            } else {
                newValue = Math.max(value, this.state.viewSize / 1.2)
            }

            this.setState({ viewSize: newValue }, () => {
                Listener.changeViewSizeFromUI(this.state.viewSize)
            })

            if (viewSize === newValue) {
                this.unsetInterval()
            }
        }

        innerHandleChange(newViewSize)

        this.setInterval(() => {
            innerHandleChange(newViewSize)
        }, 30)
    }

    public render(): React.ReactNode {
        const { viewSize } = this.state
        const sizes = Object.keys(labels)

        if (!Url.equalsPage(history.location.pathname, Urls.UNIVERSE)) {
            return null
        }

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
                    onChange={this.handleChange}
                    onChangeComplete={() => this.unsetInterval()} />
            </section>
        )
    }
}

export default ViewSizeControl