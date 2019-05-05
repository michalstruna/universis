import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Switch, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'

export const history = createBrowserHistory()

import { App, HomeView, Store, Route, UnauthRoute, AuthRoute, IdentityRoute, AboutView } from './System'
import { IdentityView, LoginView, SignUpView, ResetPasswordView } from './User'
import { UniverseView } from './Universe'
import { ApprovalsView } from './Approvals'
import { UserView } from './User'
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
                    <Route path={Urls.USER + '/:userId'} component={UserView} />
                    <UnauthRoute path={Urls.RESET_PASSWORD} component={ResetPasswordView} />
                    <Route path={Urls.ABOUT} component={AboutView} />
                    <Redirect to={Urls.HOME} />
                </Switch>
            </App>
        </Router>
    </Provider>, document.getElementById('app')
)

if ((module as any).hot) {
    (module as any).hot.accept()
}