import * as React from 'react'
import { connect, MapStateToPropsParam, MapDispatchToPropsParam } from 'react-redux'
import { withRouter, RouteProps } from 'react-router-dom'

interface IComponentProps {
    history?: {
        push: (url: string) => void
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

}

export default Component