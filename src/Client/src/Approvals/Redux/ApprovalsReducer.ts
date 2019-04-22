import { Redux } from '../../Utils'
import ActionTypes from './ActionTypes'

export default Redux.createReducer(
    Object.values(ActionTypes),
    {
        approvals: Redux.EMPTY_ASYNC_ENTITY,
        approval: Redux.EMPTY_ASYNC_ENTITY,
        disapproval: Redux.EMPTY_ASYNC_ENTITY
    }
)