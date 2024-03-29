import * as React from 'react'

import { toggleContextMenu } from '../../System'
import { Component } from '../../Utils'

interface IProps {
    toggleContextMenu: (isVisible: boolean, x?: number, y?: number) => void,
    isContextVisible: boolean
    showContext: Universis.Consumer2<number, number>
    className?: string
}

interface IState {

}

/**
 * Context trigger. After right click on this area, context will appear.
 */
class ContextTrigger extends Component<IProps, IState> {

    /**
     * After click, hide context menu.
     * @param event
     */
    private handleClick = (event: React.MouseEvent<HTMLElement>): void => {
        const { toggleContextMenu, isContextVisible } = this.props

        if (isContextVisible) {
            toggleContextMenu(false)
        }
    }

    /**
     * After click, hide context menu.
     * @param event
     */
    private handleContextMenu = (event: React.MouseEvent<HTMLElement>): void => {
        event.preventDefault()
        this.props.toggleContextMenu(true, event.pageX, event.pageY)
    }

    public render(): React.ReactNode {
        return (
            <section
                className={this.props.className}
                onClick={this.handleClick}
                onContextMenu={this.handleContextMenu}>
                {this.props.children}
            </section>
        )
    }

}

export default ContextTrigger.connect(
    ({ system }: Universis.Redux.StoreState) => ({
        isContextVisible: system.contextMenu.isVisible
    }),
    { toggleContextMenu }
)