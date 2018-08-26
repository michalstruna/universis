import * as React from 'react'
import * as ReactDOM from 'react-dom'

import AboutControl from './AboutControl'
import FullScreenControl from './FullScreenControl'
import UIControl from './UIControl'
import { SystemActions } from '../../System'
import { StatelessComponent } from '../../Utils'

interface IProps {
    isVisible: boolean
    show: IDoubleConsumer<number, number>
    x: number
    y: number
}

/**
 * Context menu with some controls.
 */
class Context extends StatelessComponent<IProps> {

    componentDidUpdate(): void {
        this.fixCoordinates()
    }

    /**
     * Check if context is out of screen and fix it.
     */
    private fixCoordinates(): void {
        const { isVisible, show, x, y } = this.props

        if (isVisible) {
            const container: any = ReactDOM.findDOMNode(this.refs.container)
            let newCoordinates = { x, y }

            const data: ClientRect | DOMRect = container.getBoundingClientRect()

            if (data.left + data.width > window.innerWidth) {
                newCoordinates.x -= data.width
            }

            if (data.top + data.height > window.innerHeight) {
                newCoordinates.y -= data.height
            }

            if (newCoordinates.x !== x || newCoordinates.y !== y) {
                show(newCoordinates.x, newCoordinates.y)
            }
        }
    }

    public render(): JSX.Element {
        const { isVisible, x, y } = this.props

        if (!isVisible) {
            return null
        }

        const style = {
            left: x + 'px',
            top: y + 'px'
        }

        return (
            <section
                className='context'
                ref='container'
                style={style}>
                <FullScreenControl />
                <UIControl />
                <AboutControl />
            </section>
        )
    }

}

export default Context.connect(
    ({ system: { context } }: IStoreState) => ({
        isVisible: context.isVisible,
        x: context.x,
        y: context.y
    }),
    (dispatch: IDispatch) => ({
        show: (x: number, y: number) => dispatch(SystemActions.showContext(x, y))
    })
)