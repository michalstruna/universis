import * as React from 'react'
import { Route, Redirect } from 'react-router-dom'

import Store from '../../Redux/Store'
import { Urls } from '../../../Utils'

const UnauthRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        const identity = Store.getState().user.identity

        if (identity.payload) {
            return <Redirect to={Urls.HOME} />
        } else {
            return <Component {...props} />
        }
    }} />
)

export default UnauthRoute