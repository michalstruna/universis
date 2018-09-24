import { Redux } from '../../Utils'
import Strings from '../Constants/Strings'
import ActionTypes from './ActionTypes'

export default Redux.createReducer(
    Object.values(ActionTypes),
    {
        alert: {
            isVisible: false,
            buttons: [] as ILinkButton[],
            title: '',
            content: ''
        },
        contextMenu: {
            isVisible: false,
            x: 0,
            y: 0
        },
        isFullScreen: false,
        isUIVisible: true,
        strings: Strings
    }
)