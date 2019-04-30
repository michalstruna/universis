import * as React from 'react'
import { Redirect, Route } from 'react-router-dom'

import Store from '../../Redux/Store'
import { Urls, Url } from '../../../Utils'

const UnauthRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        const identity = Store.getState().user.identity

        if (identity.payload) {
            return <Redirect to={Url.link({ pathname: Urls.HOME })} />
        } else {
            return <Component {...props} />
        }
    }} />
)

export default UnauthRoute