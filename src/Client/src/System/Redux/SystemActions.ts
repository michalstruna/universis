import { request, exit } from 'screenfull'

import ACTION_TYPES from './ActionTypes'

/**
 * Actions for SystemModule.
 */
class SystemActions {

    /**
     * Open full screen.
     */
    static openFullScreen = () => {
        request()
        return { type: ACTION_TYPES.OPEN_FULL_SCREEN }
    }

    /**
     * Exit full screen.
     */
    static exitFullScreen = () => {
        exit()
        return { type: ACTION_TYPES.EXIT_FULL_SCREEN }
    }

    /**
     * Show context menu.
     * @param x Horizontal coordination.
     * @param y Vertical coordination.
     */
    static showContext = (x: number, y: number) => ({
        type: ACTION_TYPES.SHOW_CONTEXT,
        x,
        y
    })

    /**
     * Hide context menu.
     */
    static hideContext = () => ({
        type: ACTION_TYPES.HIDE_CONTEXT
    })

    /**
     * Show UI controls.
     */
    static showUI = () => ({
        type: ACTION_TYPES.SHOW_UI
    })

    /**
     * Hide UI controls.
     */
    static hideUI = () => ({
        type: ACTION_TYPES.HIDE_UI
    })

    /**
     * Show alert window.
     * @param title Title of alert.
     * @param content Message of alert.
     * @param buttons List of all buttons.
     */
    static showAlert = (title: string, content: string, buttons: ILinkButton[]) => ({
        type: ACTION_TYPES.SHOW_ALERT,
        title,
        content,
        buttons
    })

    /**
     * Hide alert window.
     */
    static hideAlert = () => ({
        type: ACTION_TYPES.HIDE_ALERT
    })

}

export default SystemActions