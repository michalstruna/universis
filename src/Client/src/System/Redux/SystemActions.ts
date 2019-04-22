import { request, exit } from 'screenfull'

import ActionTypes from './ActionTypes'
import { Config, Redux } from '../../Utils'
import { receiveMessage, receiveRemoveMessage } from '../../User/Redux/UserActions'
import { receiveRemoveApproval, receiveApproval } from '../../Approvals'
import { ApprovalState, Operation, SubjectType } from '../../../../Constants'
import { receiveEvent, receiveUpdatedEvent, receiveDeletedEvent } from '../../Universe'
import { Store } from '../../System'

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
 * @param isUpdate Notification is updated, not new.
 */
export const receiveNotification = (notification: Universis.Notification, isUpdate?: boolean) => (
    dispatch => {
        if (isUpdate) {
            dispatch(receiveRemoveMessage(notification._id))
            dispatch(receiveRemoveApproval(notification._id))
        }

        if (notification.payload && notification.approvalState !== ApprovalState.APPROVED) {
            dispatch(receiveApproval(notification.payload))
        } else if (notification.approvalState === ApprovalState.APPROVED) {
            switch (notification.subjectType) {
                case SubjectType.EVENT:
                    const body = Store.getState().universe.body.payload

                    if (body && body.name === notification.subjectName) {
                        switch (notification.operation) {
                            case Operation.ADD:
                                dispatch(receiveEvent(notification.payload.after))
                                break
                            case Operation.UPDATE:
                                dispatch(receiveUpdatedEvent(notification.payload.after))
                                break
                            case Operation.DELETE:
                                dispatch(receiveDeletedEvent(notification.payload.before))
                                break
                        }
                    }

                    break
            }

        }


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
                    ActionTypes.FADE_OUT_NOTIFICATION,
                    { notifications: { $find: item => item._id === notification._id, isExpired: true } }
                )
            )

            setTimeout(() => {
                dispatch(
                    Redux.setAction(
                        ActionTypes.REMOVE_NOTIFICATION,
                        { notifications: { $remove: item => item._id === notification._id } }
                    )
                )
            }, 500)
        }, Config.NOTIFICATIONS_DURATION)
    }
)