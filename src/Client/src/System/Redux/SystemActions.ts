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
        return { type: ActionTypes.OPEN_FULL_SCREEN }
    }

    /**
     * Exit full screen.
     */
    static exitFullScreen = () => {
        exit()
        return { type: ActionTypes.EXIT_FULL_SCREEN }
    }

    /**
     * Show context menu.
     * @param x Horizontal coordination.
     * @param y Vertical coordination.
     */
    static showContext = (x: number, y: number) => ({
        type: ActionTypes.SHOW_CONTEXT,
        x,
        y
    })

    /**
     * Hide context menu.
     */
    static hideContext = () => ({
        type: ActionTypes.HIDE_CONTEXT
    })

    /**
     * Show alert window.
     * @param title Title of alert.
     * @param content Message of alert.
     * @param buttons List of all buttons.
     */
    static showAlert = (title: string, content: string, buttons: ILinkButton[]) => ({
        type: ActionTypes.SHOW_ALERT,
        title,
        content,
        buttons
    })

    /**
     * Hide alert window.
     */
    static hideAlert = () => ({
        type: ActionTypes.HIDE_ALERT
    })

    /**
     * Toggle UI.
     * @returns {IToggleAction}
     */
    static toggleUI = () =>Redux.toggleAction(ActionTypes.TOGGLE_UI)

}

export default SystemActions