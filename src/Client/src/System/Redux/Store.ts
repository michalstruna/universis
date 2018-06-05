import { applyMiddleware, createStore, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import SystemReducer from './SystemReducer'
import { FormReducer } from '../../Forms'
import { UserReducer } from '../../User'

const rootReducer = combineReducers({
    form: FormReducer,
    system: SystemReducer,
    user: UserReducer
})

const middleware = applyMiddleware(thunk)

const store = createStore(rootReducer, middleware)

export default store