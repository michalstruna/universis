import * as React from 'react'

import { Component } from '../../Utils'

interface IProps {
    className?: string,
    duration?: number,
    mounted: boolean,
    onClick?: Universis.Consumer<React.MouseEvent<HTMLElement>>,
    onContextMenu?: Universis.Consumer<React.MouseEvent<HTMLElement>>
    type?: string
}

interface IState {
    isMounted: boolean
    isVisible: boolean
}

/**
 * Layout for animated mounting and unmounting components.
 */
class FadeLayout extends Component<IProps, IState> {

    public static OPACITY = 'opacity'
    public static SCALE = 'transform'
    public static HEIGHT = 'height'

    public static defaultProps = {
        duration: 300,
        type: FadeLayout.OPACITY
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

        const { className, children, onClick, onContextMenu, type } = this.props

        const styles: any = {
            transition: `${type} ${this.props.duration / 1000}s`
        }

        if (type === FadeLayout.OPACITY) {
            styles.opacity = this.state.isVisible ? 1 : 0
        } else if (type === FadeLayout.SCALE) {
            styles.transform = `scale(${this.state.isVisible ? 1 : 0})`
        } else if (type === FadeLayout.HEIGHT) {
            styles.height = this.state.isVisible ? undefined : 0
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