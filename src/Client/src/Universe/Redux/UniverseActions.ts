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
     * Change zoom of camera.
     * @param cameraZoom New zoom.
     */
    public static changeCameraZoom = (cameraZoom: number) => ({
        type: ActionTypes.CHANGE_CAMERA_ZOOM, cameraZoom
    })

}

export default UniverseActions