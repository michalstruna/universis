import * as React from 'react'

import { SystemActions } from '../../System'
import { Component } from '../../Utils'

interface IProps {
    hideContext: () => void
    isContextVisible: boolean
    showContext: (x: number, y: number) => void

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
        const { hideContext, isContextVisible } = this.props

        if(isContextVisible) {
            hideContext()
        }
    }

    /**
     * After click, hide context menu.
     * @param event
     */
    private handleContextMenu = (event: React.MouseEvent<HTMLElement>): void => {
        event.preventDefault()
        this.props.showContext(event.pageX, event.pageY)
    }

    public render(): JSX.Element {
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
    ({ system }: any) => ({
        isContextVisible: system.context.isVisible
    }),
    (dispatch: any) => ({
        hideContext: () => dispatch(SystemActions.hideContext()),
        showContext: (x: number, y: number) => dispatch(SystemActions.showContext(x, y))
    })
)