import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Switch, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'

export const history = createBrowserHistory()

import { App, HomeView, Store, Route, UnauthRoute, AuthRoute, IdentityRoute } from './System'
import { IdentityView, LoginView, SignUpView, ResetPasswordView } from './User'
import { UniverseView } from './Universe'
import { ApprovalsView } from './Approvals'
import { Urls } from './Utils'

import './index.scss'

render(
    <Provider store={Store}>
        <Router history={history}>
            <App>
                <Switch>
                    <Route exact path={Urls.HOME} component={HomeView} />
                    <UnauthRoute path={Urls.IDENTITY} component={IdentityView} />
                    <IdentityRoute path={Urls.LOGIN} component={LoginView} />
                    <IdentityRoute path={Urls.SIGN_UP} component={SignUpView} />
                    <Route path={Urls.UNIVERSE} component={UniverseView} />
                    <Route path={Urls.APPROVALS} component={ApprovalsView} />
                    <UnauthRoute path={Urls.RESET_PASSWORD} component={ResetPasswordView} />
                    <Redirect to={Urls.HOME} />
                </Switch>
            </App>
        </Router>
    </Provider>, document.getElementById('app')
)

if ((module as any).hot) {
    (module as any).hot.accept()
}