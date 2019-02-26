import * as React from 'react'

import AboutControl from './AboutControl'
import FullScreenControl from './FullScreenControl'
import UIControl from './UIControl'
import { toggleContextMenu } from '../../System'
import { StatelessComponent } from '../../Utils'

interface IProps {
    isVisible: boolean
    toggleContextMenu: Universis.Consumer3<boolean, number, number>
    x: number
    y: number
}

/**
 * Context menu with some controls.
 */
class ContextMenu extends StatelessComponent<IProps> {

    /**
     * Container of context menu.
     */
    private container: HTMLElement

    public componentDidUpdate(): void {
        this.fixCoordinates()
    }

    /**
     * Check if context is out of screen and fix it.
     */
    private fixCoordinates(): void {
        const { isVisible, toggleContextMenu, x, y } = this.props

        if (isVisible) {
            let newCoordinates = { x, y }

            const data: ClientRect | DOMRect = this.container.getBoundingClientRect()

            if (data.left + data.width > window.innerWidth) {
                newCoordinates.x -= data.width
            }

            if (data.top + data.height > window.innerHeight) {
                newCoordinates.y -= data.height
            }

            if (newCoordinates.x !== x || newCoordinates.y !== y) {
                toggleContextMenu(true, newCoordinates.x, newCoordinates.y)
            }
        }
    }

    public render(): React.ReactNode {
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
                ref={ref => this.container = ref}
                style={style}>
                <FullScreenControl />
                <UIControl />
                <AboutControl />
            </section>
        )
    }

}

export default ContextMenu.connect(
    ({ system: { contextMenu } }: Universis.Redux.StoreState) => ({
        isVisible: contextMenu.isVisible,
        x: contextMenu.x,
        y: contextMenu.y
    }),
    { toggleContextMenu }
)