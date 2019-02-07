import ActionTypes from './ActionTypes'
import { Redux } from '../../Utils'

export default Redux.createReducer(
    Object.values(ActionTypes),
    {
        selectedBody: null,
        areLabelsVisible: true,
        isLightVisible: false,
        areOrbitsVisible: true,
        bodies: Redux.EMPTY_ASYNC_ENTITY,
        body: Redux.EMPTY_ASYNC_ENTITY,
        events: Redux.EMPTY_ASYNC_ENTITY
    }
)