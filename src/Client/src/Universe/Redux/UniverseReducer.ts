import ActionTypes from './ActionTypes'
import { Redux } from '../../Utils'
import Follow from '../Constants/Follow'

export default Redux.createReducer(
    Object.values(ActionTypes),
    {
        selectedBody: null,
        isNameVisible: true,
        isLightVisible: false,
        areOrbitsVisible: true,
        isVelocityVisible: false,
        isFromEarthVisible: false,
        isFromCenterVisible: false,
        isFromCameraVisible: false,
        areParticlesVisible: true,
        bodies: Redux.EMPTY_ASYNC_ENTITY,
        body: Redux.EMPTY_ASYNC_ENTITY,
        isNewDiscussionExpanded: false,
        newVote: Redux.EMPTY_ASYNC_ENTITY,
        newUnvote: Redux.EMPTY_ASYNC_ENTITY,
        timeSpeed: 1,
        follow: Follow.MOVE
    }
)