import ACTION_TYPES from './ActionTypes'
import Strings from '../Constants/Strings'

const initialState = {
    isFullScreen: false,
    strings: Strings
}

export default function (state: any = initialState, action: any) {
    switch (action.type) {

        case ACTION_TYPES.OPEN_FULL_SCREEN:
            return {
                ...state,
                isFullScreen: true
            }

        case ACTION_TYPES.EXIT_FULL_SCREEN:
            return {
                ...state,
                isFullScreen: false
            }

        default:
            return state

    }
}