import * as React from 'react'
import { connect, MapStateToPropsParam, MapDispatchToPropsParam } from 'react-redux'
import { withRouter, RouteProps } from 'react-router-dom'
import { reduxForm } from 'redux-form'

interface IComponentProps {
    history?: {
        push: Universis.Consumer<string | { pathname?: string, search?: string }>,
        replace: Universis.Consumer<string | { pathname?: string, search?: string }>
    }
    location?: Location,
    match?: any
}

/**
 * Base component for all another components.
 */
class Component<IProps, IState> extends React.Component<IProps & RouteProps & IComponentProps, IState> {

    /**
     * Callback after resize window.
     */
    private handleResize: Universis.Runnable

    /**
     * Interval.
     */
    private interval: number

    /**
     * Connect component with store and router.
     * @param mapStateToProps
     * @param mapDispatchToProps
     * @param formOptions
     * @return Connected component.
     */
    public static connect(mapStateToProps?: MapStateToPropsParam<{}, {}, {}>, mapDispatchToProps?: MapDispatchToPropsParam<{}, {}>, formOptions?: Universis.Map<any>): any {
        const component = formOptions ? reduxForm(formOptions)(this as any) : this

        return withRouter(connect(
            mapStateToProps,
            mapDispatchToProps
        )(component as any) as any)
    }

    /**
     * Unbind all window events.
     */
    public componentWillUnmount(): void {
        if (this.handleResize) {
            window.removeEventListener('resize', this.handleResize)
        }

        this.unsetInterval()
    }

    /**
     * Set resize handler.
     * @param callback Handler.
     */
    protected setOnResize(callback: Universis.Runnable): void {
        this.handleResize = callback
        window.addEventListener('resize', this.handleResize)
    }

    /**
     * Set interval callback.
     * @param callback Callback.
     * @param interval Interval in milliseconds.
     */
    protected setInterval(callback: Universis.Runnable, interval: number) {
        this.interval = window.setInterval(callback, interval)
    }

    protected unsetInterval() {
        if (this.interval) {
            clearInterval(this.interval)
        }
    }

}

export default Component