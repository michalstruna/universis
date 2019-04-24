import { request, exit } from 'screenfull'

import ActionTypes from './ActionTypes'
import { Config } from '../../Utils'
import { Redux } from '../../Utils'
import { receiveMessage } from '../../User/Redux/UserActions'
import { SubjectType } from '../../../../Constants'

/**
 * Toggle full screen.
 * @param isFullScreen Toggled value.
 */
export const toggleFullScreen = (isFullScreen: boolean) => {
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
export const toggleContextMenu = (isVisible: boolean, x?: number, y?: number) => (
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
export const toggleAlert = (isVisible: boolean, title?: string, content?: string, buttons?: ILinkButton[]) => (
    Redux.toggleAction(
        ActionTypes.TOGGLE_ALERT,
        { alert: { isVisible, title, content, buttons } }
    )
)

/**
 * Toggle UI.
 */
export const toggleUI = (isUIVisible: boolean) => (
    Redux.toggleAction(ActionTypes.TOGGLE_UI, { isUIVisible })
)

/**
 * Receive notification.
 * @param notification
 */
export const receiveNotification = (notification: Universis.Notification) => (
    dispatch => {
        dispatch(receiveMessage(notification))

        dispatch(
            Redux.setAction(
                ActionTypes.RECEIVE_NOTIFICATION,
                { notifications: { $add: notification } }
            )
        )

        setTimeout(() => {
            dispatch(
                Redux.setAction(
                    ActionTypes.REMOVE_NOTIFICATION,
                    { notifications: { $find: item => item._id === notification._id, isExpired: true } }
                )
            )
        }, Config.NOTIFICATIONS_DURATION)
    }
)