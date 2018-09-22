import { request, exit } from 'screenfull'

import ActionTypes from './ActionTypes'
import { Redux } from '../../Utils'

/**
 * Actions for SystemModule.
 */
class SystemActions {

    /**
     * Open full screen.
     */
    static openFullScreen = () => {
        request()
        return Redux.setAction(ActionTypes.SET_FULL_SCREEN, true)
    }

    /**
     * Exit full screen.
     */
    static exitFullScreen = () => {
        exit()
        return Redux.setAction(ActionTypes.SET_FULL_SCREEN, false)
    }

    /**
     * Show context menu.
     * @param x Horizontal coordination.
     * @param y Vertical coordination.
     */
    static showContextMenu = (x: number, y: number) => (
        Redux.setAction(
            ActionTypes.SET_CONTEXT_MENU,
            { isVisible: true, x, y }
        )
    )

    /**
     * Hide context menu.
     */
    static hideContextMenu = () => (
        Redux.setAction(
            ActionTypes.SET_CONTEXT_MENU,
            { isVisible: false }
        )
    )

    /**
     * Show alert window.
     * @param title Title of alert.
     * @param content Message of alert.
     * @param buttons List of all buttons.
     */
    static showAlert = (title: string, content: string, buttons: ILinkButton[]) => (
        Redux.setAction(
            ActionTypes.SET_ALERT,
            { isVisible: true, title, content, buttons }
        )
    )

    /**
     * Hide alert window.
     */
    static hideAlert = () => (
        Redux.setAction(
            ActionTypes.SET_ALERT,
            { isVisible: false }
        )
    )

    /**
     * Toggle UI.
     */
    static toggleUI = () => Redux.toggleAction(ActionTypes.TOGGLE_UI)

}

export default SystemActions