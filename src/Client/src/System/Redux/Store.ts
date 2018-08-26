import { applyMiddleware, createStore, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import SystemReducer from './SystemReducer'
import { FormReducer } from '../../Forms'
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

const middleware = applyMiddleware(thunk)

const store = createStore<IStoreState>(rootReducer, middleware)

export default store