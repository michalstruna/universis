import { request, exit } from 'screenfull'

import ActionTypes from './ActionTypes'
import { Config, Redux } from '../../Utils'
import { receiveMessage, receiveRemoveMessage, receiveUserScoreChange } from '../../User/Redux/UserActions'
import { receiveRemoveApproval, receiveApproval } from '../../Approvals/Redux/ApprovalsActions'
import { ApprovalState, Operation, SubjectType, UserScore } from '../../../../Constants'
import {
    receiveEvent,
    receiveUpdatedEvent,
    receiveDeletedEvent,
    receiveBodyType,
    receiveDeletedBodyType,
    receiveUpdatedBodyType,
    receiveBody,
    receiveDeletedBody,
    receiveUpdatedBody,
    receivePost
} from '../../Universe/Redux/UniverseActions'
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
            const body = Store.getState().universe.body.payload
            const bodies = Store.getState().universe.bodies.payload
            const user = Store.getState().user.user.payload
            const identity = Store.getState().user.identity.payload
            const score = UserScore[notification.subjectType]

            switch (notification.subjectType) {
                case SubjectType.EVENT:
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

                case SubjectType.BODY_TYPE:
                    const bodyTypes = Store.getState().universe.bodyTypes.payload

                    if (bodyTypes) {
                        switch (notification.operation) {
                            case Operation.ADD:
                                dispatch(receiveBodyType(notification.payload.after))
                                break
                            case Operation.UPDATE:
                                dispatch(receiveUpdatedBodyType(notification.payload.after))
                                break
                            case Operation.DELETE:
                                dispatch(receiveDeletedBodyType(notification.payload.before))
                                break
                        }
                    }

                    break

                case SubjectType.POST:
                    notification.payload.after.user = notification.user

                    if (body && body.name === notification.subjectName) {
                        switch (notification.operation) {
                            case Operation.ADD:
                                dispatch(receivePost(notification.payload.after))
                                break
                        }
                    }

                    break

                case SubjectType.BODY:
                    if (bodies) {
                        switch (notification.operation) {
                            case Operation.ADD:
                                dispatch(receiveBody(notification.payload.after))
                                break
                            case Operation.UPDATE:
                                dispatch(receiveUpdatedBody(notification.payload.after, body && body.name === notification.subjectName))
                                break
                            case Operation.DELETE:
                                dispatch(receiveDeletedBody(notification.payload.before))
                                break
                        }
                    }
            }

            if (score) {
                if (notification.subjectType !== SubjectType.POST_VOTE && notification.user) {
                    dispatch(receiveUserScoreChange(user._id, score))
                }
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