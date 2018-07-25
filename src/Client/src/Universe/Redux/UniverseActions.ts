import { Api, Redux } from '../../Utils'
import ActionTypes from './ActionTypes'

/**
 * Actions for universe.
 */
class UniverseActions {
    /**
     * Get all bodies.
     */
    public static getBodies = () => (
        Redux.asyncAction(Api.getBodies(), ActionTypes.GET_BODIES)
    )

    public static getBody = (bodyId: string) => (
        Redux.asyncAction(Api.getBody(bodyId), ActionTypes.GET_BODY)
    )

}

export default UniverseActions