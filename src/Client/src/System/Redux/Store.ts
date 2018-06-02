import { createStore, combineReducers } from 'redux'

import SystemReducer from './SystemReducer'

const rootReducer = combineReducers({
    system: SystemReducer
})

const store = createStore(rootReducer)

export default store