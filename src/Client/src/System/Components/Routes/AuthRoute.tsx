import * as React from 'react'
import { Route, Redirect } from 'react-router-dom'

import Store from '../../Redux/Store'
import { Url, Urls } from '../../../Utils'

const AuthRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        const identity = Store.getState().user.identity

        if (!identity.payload) {
            return <Redirect to={Url.link({ pathname: Urls.IDENTITY })} />
        } else {
            return <Component {...props} />
        }
    }} />
)

export default AuthRoute