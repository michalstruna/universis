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
export const setBodyFilter = (bodyFilter: Universis.Map<any>) => (
    Redux.setAction(
        ActionTypes.SET_BODY_FILTER,
        { bodyFilter }
    )
)

/**
 * Get last n notifications.
 * @param limit Count of notifications.
 */
export const getNotifications = (limit: number) => (
    Redux.asyncAction(
        ActionTypes.GET_NOTIFICATIONS,
        { notifications: Request.get(`notifications`, { sort: 'date', order: 'desc', limit }) }
    )
)