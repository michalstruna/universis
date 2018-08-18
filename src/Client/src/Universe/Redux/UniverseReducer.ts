import ActionTypes from './ActionTypes'
import { Redux } from '../../Utils'

export default Redux.createReducer(
    {
        cameraZoom: 1
    },
    (state, action) => {
        switch (action.type) {
            case ActionTypes.CHANGE_CAMERA_ZOOM:
                return {
                    ...state,
                    cameraZoom: action.cameraZoom
                }
        }
    }
)