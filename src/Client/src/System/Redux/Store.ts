import { createStore, combineReducers } from 'redux'

import SystemReducer from './SystemReducer'
import { FormReducer } from '../../Forms'

const rootReducer = combineReducers({
    form: FormReducer,
    system: SystemReducer
})

const store = createStore(rootReducer)

export default store