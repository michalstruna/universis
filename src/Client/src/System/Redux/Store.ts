import { applyMiddleware, createStore, combineReducers } from 'redux'
import Thunk from 'redux-thunk'
import ReduxLogger from 'redux-logger'

import { reducer as FormReducer } from 'redux-form'
import SystemReducer from './SystemReducer'
import { UserReducer } from '../../User'
import { UniverseReducer } from '../../Universe'
import { PanelReducer } from '../../Panel'

const rootReducer = combineReducers({
    form: FormReducer,
    system: SystemReducer,
    user: UserReducer,
    universe: UniverseReducer,
    panel: PanelReducer
})

const middleware = applyMiddleware(Thunk, ReduxLogger)

const store = createStore<IStoreState>(rootReducer, middleware)

export default store