import { request, exit } from 'screenfull'

import ACTION_TYPES from './ActionTypes'

/**
 * Actions for SystemModule.
 */
class SystemActions {

    /**
     * Open full screen.
     */
    static openFullScreen = () => {
        request()
        return { type: ACTION_TYPES.OPEN_FULL_SCREEN }
    }

    /**
     * Exit full screen.
     */
    static exitFullScreen = () => {
        exit()
        return { type: ACTION_TYPES.EXIT_FULL_SCREEN }
    }

}

export default SystemActions