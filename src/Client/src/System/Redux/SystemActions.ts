import { request, exit } from 'screenfull'

import ActionTypes from './ActionTypes'
import { Redux } from '../../Utils'

/**
 * Actions for SystemModule.
 */
class SystemActions {

    /**
     * Toggle full screen.
     * @param isFullScreen Toggled value.
     */
    public static toggleFullScreen = (isFullScreen: boolean) => {
        isFullScreen ? request() : exit()

        return Redux.toggleAction(
            ActionTypes.TOGGLE_FULL_SCREEN,
            { isFullScreen }
        )
    }

    /**
     * Show context menu.
     * @param isVisible Toggled value.
     * @param x Horizontal coordination.
     * @param y Vertical coordination.
     */
    public static toggleContextMenu = (isVisible: boolean, x?: number, y?: number) => (
        Redux.toggleAction(
            ActionTypes.TOGGLE_CONTEXT_MENU,
            { contextMenu: { isVisible, x, y } }
        )
    )

    /**
     * Toggle alert window.
     * @param isVisible
     * @param title Title of alert.
     * @param content Message of alert.
     * @param buttons List of all buttons.
     */
    public static toggleAlert = (isVisible: boolean, title?: string, content?: string, buttons?: ILinkButton[]) => (
        Redux.toggleAction(
            ActionTypes.TOGGLE_ALERT,
            { alert: { isVisible, title, content, buttons } }
        )
    )

    /**
     * Toggle UI.
     */
    public static toggleUI = (isUIVisible: boolean) => (
        Redux.toggleAction(ActionTypes.TOGGLE_UI, { isUIVisible })
    )

}

export default SystemActions