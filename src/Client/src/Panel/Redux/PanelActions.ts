import ActionTypes from './ActionTypes'
import { Redux, Request } from '../../Utils'

/**
 * Set panel tab.
 * @param tab Name of tab.
 */
export const setTab = (tab: string) => (
    Redux.setAction(
        ActionTypes.SET_PANEL_TAB,
        { tab }
    )
)

/**
 * Set body filter.
 * @param bodyFilter Filter.
 */
export const setBodyFilter = (bodyFilter: IObject<any>) => (
    Redux.setAction(
        ActionTypes.SET_BODY_FILTER,
        { bodyFilter }
    )
)

/**
 * Add new notification.
 * @param notification New notification.
 */
export const addNotification = (notification: Universis.Notification.New) => (
    Redux.asyncAction(
        ActionTypes.ADD_NOTIFICATION,
        { newNotification: Request.post(`notifications`, notification) }
    )
)

/**
 * Get last n notifications.
 * @param limit Count of notifications.
 */
export const getNotifications = (limit: number) => (
    Redux.asyncAction(
        ActionTypes.GET_NOTIFICATIONS,
        { notifications: Request.get(`notifications`) }
    )
)