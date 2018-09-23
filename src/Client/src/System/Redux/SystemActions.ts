import { request, exit } from 'screenfull'

import ActionTypes from './ActionTypes'
import { Redux } from '../../Utils'

/**
 * Actions for SystemModule.
 */
class SystemActions {

    /**
     * Toggle full screen.
     * @param isFullScreen
     */
    public static toggleFullScreen = (isFullScreen: boolean) => (
        Redux.toggleAction(
            ActionTypes.TOGGLE_FULL_SCREEN,
            { isFullScreen },
            undefined,
            () => isFullScreen ? request() : exit()
        )
    )

    /**
     * Show context menu.
     * @param x Horizontal coordination.
     * @param y Vertical coordination.
     */
    public static showContextMenu = (x: number, y: number) => (
        Redux.setAction(
            ActionTypes.SET_CONTEXT_MENU,
            { contextMenu: { isVisible: true, x, y } }
        )
    )

    /**
     * Hide context menu.
     */
    public static hideContextMenu = () => (
        Redux.setAction(
            ActionTypes.SET_CONTEXT_MENU,
            { contextMenu: { isVisible: false } }
        )
    )

    /**
     * Toggle alert window.
     * @param isAlertVisible
     * @param title Title of alert.
     * @param content Message of alert.
     * @param buttons List of all buttons.
     */
    public static toggleAlert = (isAlertVisible: boolean, title?: string, content?: string, buttons?: ILinkButton[]) => (
        Redux.toggleAction(
            ActionTypes.TOGGLE_ALERT,
            { isAlertVisible, alert: { title, content, buttons } }
        )
    )

    /**
     * Toggle UI.
     */
    public static toggleUI = (isUIVisible: boolean) => Redux.toggleAction(ActionTypes.TOGGLE_UI, { isUIVisible })

}

export default SystemActions