import { Request, Redux } from '../../Utils'
import ActionTypes from './ActionTypes'

/**
 * Actions for universe.
 */
class UniverseActions {

    /**
     * Get all bodies.
     */
    public static getBodies = () => (
        Redux.asyncAction(
            ActionTypes.GET_BODIES,
            { bodies: Request.get(`bodies`, { sort: '_id' }) }
        )
    )

    /**
     * Get body by ID.
     * @param bodyId ID of body.
     */
    public static getBody = (bodyId: string) => (
        Redux.asyncAction(
            ActionTypes.GET_BODY,
            { body: Request.get<IBody>(`bodies/${bodyId}`) }
        )
    )

    /**
     * Change view size of camera.
     * @param viewSize New view size.
     */
    public static changeViewSize = (viewSize: number) => (
        Redux.setAction(ActionTypes.CHANGE_VIEW_SIZE, { viewSize })
    )

}

export default UniverseActions


