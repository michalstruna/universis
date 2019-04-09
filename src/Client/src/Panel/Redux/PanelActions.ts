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

/**
 * Toggle visibility of body form.
 * @param isVisible
 * @param selectedBody
 */
export const toggleBodyForm = (isVisible: boolean, selectedBody: Universis.Universe.Body = null) => (
    dispatch => {
        dispatch(Redux.toggleAction(
            ActionTypes.TOGGLE_BODY_FORM,
            { isBodyFormVisible: isVisible, selectedBody }
        ))
    }
)

/**
 * Toggle visibility of body event form.
 * @param isVisible
 * @param selectedEvent
 */
export const toggleBodyEventForm = (isVisible: boolean, selectedEvent: Universis.Event = null) => (
    dispatch => {
        dispatch(Redux.toggleAction(
            ActionTypes.TOGGLE_BODY_EVENT_FORM,
            { isBodyEventFormVisible: isVisible, selectedEvent }
        ))
    }
)

/**
 * Toggle visibility of body type form.
 * @param isVisible
 * @param selectedBodyType
 */
export const toggleBodyTypeForm = (isVisible: boolean, selectedBodyType: Universis.Universe.Body.Type = null) => (
    dispatch => {
        dispatch(Redux.toggleAction(
            ActionTypes.TOGGLE_BODY_TYPE_FORM,
            { isBodyTypeFormVisible: isVisible, selectedBodyType }
        ))
    }
)
