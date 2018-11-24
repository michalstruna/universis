import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'

export const history = createBrowserHistory()

import { App, HomeView, Store, } from './System'
import { IdentityView, LoginView, SignUpView } from './User'
import { UniverseView } from './Universe'
import { Urls } from './Utils'

import './index.scss'

render(
    <Provider store={Store}>
        <Router history={history}>
            <App>
                <Switch>
                    <Route exact path={Urls.HOME} component={HomeView} />
                    <Route path={Urls.IDENTITY} component={IdentityView} />
                    <Route path={Urls.LOGIN} component={LoginView} />
                    <Route path={Urls.SIGN_UP} component={SignUpView} />
                    <Route path={Urls.UNIVERSE} component={UniverseView} />
                    <Redirect to={Urls.HOME} />
                </Switch>
            </App>
        </Router>
    </Provider>, document.getElementById('app')
)

if ((module as any).hot) {
    (module as any).hot.accept()
}