import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { App, HomeView, Store, } from './System'
import { IdentityView, LoginView, SignUpView } from './User'
import { UniverseView } from './Universe'
import { Urls } from './Utils'

import './index.scss'

render(
    <Provider store={Store}>
        <Router>
            <App>
                <Route
                    render={({ location }) => (
                        <Switch location={location}>
                            <Route exact path={Urls.HOME} component={HomeView} />
                            <Route path={Urls.IDENTITY} component={IdentityView} />
                            <Route path={Urls.LOGIN} component={LoginView} />
                            <Route path={Urls.SIGN_UP} component={SignUpView} />
                            <Route path={Urls.UNIVERSE} component={UniverseView} />
                        </Switch>
                    )}
                />
            </App>
        </Router>
    </Provider>, document.getElementById('app')
)

if ((module as any).hot) {
    (module as any).hot.accept()
}