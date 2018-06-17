import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import { App, HomeView, Store, } from './System'
import { IdentityView, LoginView, SignUpView } from './User'
import { Urls } from './Utils'

import './index.scss'

render(
    <Provider store={Store}>
        <Router>
            <App>
                <Route
                    render={({ location }) => (
                        <TransitionGroup>
                            <CSSTransition key={location.key} classNames='app__transition' timeout={500}>
                                <Switch location={location}>
                                    <Route exact path={Urls.HOME} component={HomeView} />
                                    <Route path={Urls.IDENTITY} component={IdentityView} />
                                    <Route path={Urls.LOGIN} component={LoginView} />
                                    <Route path={Urls.SIGN_UP} component={SignUpView} />
                                </Switch>
                            </CSSTransition>
                        </TransitionGroup>
                    )}
                />
            </App>
        </Router>
    </Provider>, document.getElementById('app')
)

if ((module as any).hot) {
    (module as any).hot.accept()
}