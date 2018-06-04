import ACTION_TYPES from './ActionTypes'
import Strings from '../Constants/Strings'

const initialState = {
    alert: {
        buttons: [] as ILinkButton[],
        content: '',
        isVisible: false,
        title: '',
    },
    context: {
        isVisible: false,
        x: 0,
        y: 0
    },
    isFullScreen: false,
    isUIVisible: true,
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

        case ACTION_TYPES.SHOW_CONTEXT:
            return {
                ...state,
                context: {
                    ...state.context,
                    isVisible: true,
                    x: action.x,
                    y: action.y
                }
            }

        case ACTION_TYPES.HIDE_CONTEXT:
            return {
                ...state,
                context: {
                    ...state.context,
                    isVisible: false
                }
            }

        case ACTION_TYPES.SHOW_UI:
            return {
                ...state,
                isUIVisible: true
            }

        case ACTION_TYPES.HIDE_UI:
            return {
                ...state,
                isUIVisible: false
            }

        case ACTION_TYPES.SHOW_ALERT:
            return {
                ...state,
                alert: {
                    ...state.alert,
                    buttons: action.buttons,
                    content: action.content,
                    isVisible: true,
                    title: action.title
                }
            }

        case ACTION_TYPES.HIDE_ALERT:
            return {
                ...state,
                alert: {
                    ...state.alert,
                    isVisible: false
                }
            }

        default:
            return state

    }
}