import ActionTypes from './ActionTypes'
import { Redux } from '../../Utils'

/**
 * Actions for universe.
 */
class PanelActions {

    /**
     * Set panel tab.
     * @param tab Name of tab.
     */
    public static setTab = (tab: string) => (
        Redux.setAction(
            ActionTypes.SET_PANEL_TAB,
            { tab }
        )
    )

    /**
     * Set body filter.
     * @param bodyFilter Filter.
     */
    public static setBodyFilter = (bodyFilter: IObject<any>) => (
        Redux.setAction(
            ActionTypes.SET_BODY_FILTER,
            { bodyFilter }
        )
    )

}

export default PanelActions