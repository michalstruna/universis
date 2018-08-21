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

    /**
     * Get body by ID.
     * @param bodyId ID of body.
     */
    public static getBody = (bodyId: string) => (
        Redux.asyncAction(Api.getBody(bodyId), ActionTypes.GET_BODY)
    )

    /**
     * Change view size of camera.
     * @param viewSize New view size.
     */
    public static changeViewSize = (viewSize: number) => ({
        type: ActionTypes.CHANGE_VIEW_SIZE, viewSize
    })

}

export default UniverseActions