import ActionTypes from './ActionTypes'
import { Redux } from '../../Utils'

/**
 * Actions for universe.
 */
class PanelActions {

    /**
     * Set panel tab.
     */
    public static setTab = (tab: string) => Redux.setAction(ActionTypes.SET_PANEL_TAB, tab)

}

export default PanelActions