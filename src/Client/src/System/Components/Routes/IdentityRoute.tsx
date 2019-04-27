import * as React from 'react'
import { Route, Redirect } from 'react-router-dom'

import Store from '../../Redux/Store'
import { Urls } from '../../../Utils'

const IdentityRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        const identity = Store.getState().user.identity
        const unauthUser = Store.getState().user.unauthUser

        if (identity.payload) {
            return <Redirect to={Urls.HOME} />
        } else if (!unauthUser.payload) {
            return <Redirect to={Urls.IDENTITY} />
        } else {
            return <Component {...props} />
        }
    }} />
)

export default IdentityRoute