import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import {
    App,
    HomeView,
    Store,
    Urls
} from './System'

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