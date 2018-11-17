import ActionTypes from './ActionTypes'
import { Redux } from '../../Utils'

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