import ActionTypes from './ActionTypes'
import { Redux } from '../../Utils'

export default Redux.createReducer(
    {
        viewSize: 1
    },
    (state, action) => {
        switch (action.type) {
            case ActionTypes.CHANGE_VIEW_SIZE:
                return {
                    ...state,
                    viewSize: action.viewSize
                }
        }
    }
)