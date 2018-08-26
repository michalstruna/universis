import ActionTypes from './ActionTypes'
import { Redux } from '../../Utils'
import Strings from '../Constants/Strings'

export default Redux.createReducer(
    {
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
    },
    (state, action) => {
        switch (action.type) {

            case ActionTypes.OPEN_FULL_SCREEN:
                return {
                    ...state,
                    isFullScreen: true
                }

            case ActionTypes.EXIT_FULL_SCREEN:
                return {
                    ...state,
                    isFullScreen: false
                }

            case ActionTypes.SHOW_CONTEXT:
                return {
                    ...state,
                    context: {
                        ...state.context,
                        isVisible: true,
                        x: action.x,
                        y: action.y
                    }
                }

            case ActionTypes.HIDE_CONTEXT:
                return {
                    ...state,
                    context: {
                        ...state.context,
                        isVisible: false
                    }
                }

            case ActionTypes.SHOW_ALERT:
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

            case ActionTypes.HIDE_ALERT:
                return {
                    ...state,
                    alert: {
                        ...state.alert,
                        isVisible: false
                    }
                }

        }
    }
)