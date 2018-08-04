import * as React from 'react'
import { connect, MapStateToPropsParam, MapDispatchToPropsParam } from 'react-redux'
import { withRouter, RouteProps } from 'react-router-dom'

interface IComponentProps {
    history?: {
        push: IConsumer<string>
    }
    location?: {
        pathname: string
    }
}

/**
 * Base component for all another components.
 */
class Component<IProps, IState> extends React.Component<IProps & RouteProps & IComponentProps, IState> {

    /**
     * Callback after resize window.
     */
    private handleResize: IRunnable

    /**
     * Connect component with store and router.
     * @param mapStateToProps
     * @param mapDispatchToProps
     * @return Connected component.
     */
    public static connect(mapStateToProps?: MapStateToPropsParam<{}, {}, {}>, mapDispatchToProps?: MapDispatchToPropsParam<{}, {}>): any {
        return withRouter(connect(
            mapStateToProps,
            mapDispatchToProps
        )(this) as any)
    }

    /**
     * Unbind all window events.
     */
    public componentWillUnmount(): void {
        if (this.handleResize) {
            window.removeEventListener('resize', this.handleResize)
        }
    }

    /**
     * Set resize handler.
     * @param callback Handler.
     */
    protected setOnResize(callback: IRunnable): void {
        this.handleResize = callback
        window.addEventListener('resize', this.handleResize)
    }

}

export default Component