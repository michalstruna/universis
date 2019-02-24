import * as React from 'react'

import { Component } from '../../Utils'

interface IProps {
    className?: string,
    duration?: number,
    mounted: boolean,
    onClick?: IConsumer<React.MouseEvent<HTMLElement>>,
    onContextMenu?: IConsumer<React.MouseEvent<HTMLElement>>
}

interface IState {
    isMounted: boolean,
    isVisible: boolean
}

/**
 * Layout for animated mounting and unmounting components.
 */
class FadeLayout extends Component<IProps, IState> {

    public static defaultProps = {
        duration: 500
    }

    public constructor(props: IProps) {
        super(props)

        this.state = {
            isVisible: false,
            isMounted: props.mounted
        }
    }

    public componentDidMount(): void {
        this.updateVisibility()
    }

    public componentDidUpdate(prevProps: IProps): void {
        if (this.props.mounted !== prevProps.mounted) {
            this.updateVisibility()
        }
    }

    /**
     * Update visibility depend on state.
     * There is two states: mounted and visible (during animation).
     */
    private updateVisibility(): void {
        const { duration, mounted } = this.props

        if (mounted) {
            this.setState({ isMounted: true })
            setTimeout(() => {
                this.setState({ isVisible: true })
            }, 20)
        } else {
            this.setState({ isVisible: false })
            setTimeout(() => {
                this.setState({ isMounted: false })
            }, duration)
        }
    }

    public render(): React.ReactNode {
        if (!this.state.isMounted) {
            return null
        }

        const { className, children, onClick, onContextMenu } = this.props

        const styles = {
            opacity: this.state.isVisible ? 1 : 0,
            transition: 'opacity ' + (this.props.duration / 1000) + 's'
        }

        return (
            <section
                className={className}
                onClick={onClick}
                onContextMenu={onContextMenu}
                style={styles}>
                {children}
            </section>
        )
    }

}

export default FadeLayout