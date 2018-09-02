import * as ClassNames from 'classnames'
import * as React from 'react'

import { Component } from '../../Utils'

interface IProps {
    className?: string
    content: JSX.Element
}

interface IState {
    isVisible: boolean
    x: number
    y: number
}

/**
 * Section with context info.
 */
class ContextInfo extends Component<IProps, IState> {

    public constructor(props) {
        super(props)

        this.state = {
            isVisible: false,
            x: 0,
            y: 0
        }
    }

    private handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
        this.setState({ isVisible: true, x: event.pageX, y: event.pageY })
    }

    private handleMouseLeave = (event: React.MouseEvent<HTMLElement>) => {
        this.setState({ isVisible: false })
    }

    private renderContextInfo(): JSX.Element {
        const { content } = this.props
        const { isVisible, x, y } = this.state

        if (!isVisible) {
            return null
        }

        return (
            <section
                className={ClassNames('context__info--inner')}
                style={{ left: x, top: Math.min(y, window.innerHeight - 100) }}>
                {content}
            </section>
        )
    }

    public render(): JSX.Element {
        const { className, children } = this.props

        return (
            <section
                className={ClassNames('context__info', className)}
                onMouseEnter={this.handleMouseEnter}
                onClick={this.handleMouseLeave}
                onMouseLeave={this.handleMouseLeave}>
                {children}
                {this.renderContextInfo()}
            </section>
        )
    }

}

export default ContextInfo.connect()