import { applyMiddleware, createStore, combineReducers } from 'redux'
import Thunk from 'redux-thunk'

import SystemReducer from './SystemReducer'
import { FormReducer } from '../../Forms'

const rootReducer = combineReducers({
    form: FormReducer,
    system: SystemReducer
})

const store = createStore(rootReducer, applyMiddleware(Thunk))

export default store