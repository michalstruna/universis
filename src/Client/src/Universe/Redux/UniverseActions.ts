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
            { bodies: Request.get<ISimpleBody[]>(`bodies`, { sort: '_id' }) }
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
        Redux.setAction(
            ActionTypes.CHANGE_VIEW_SIZE,
            { viewSize }
        )
    )

    /**
     * Select body.
     * @param selectedBody ID of selected body.
     */
    public static selectBody = (selectedBody: string) => (
        Redux.setAction(
            ActionTypes.SELECT_BODY,
            { selectedBody }
        )
    )

    /**
     * Toggle visibility of labels.
     * @param areLabelsVisible Labels are visible.
     */
    public static toggleLabels = (areLabelsVisible: boolean) => (
        Redux.setAction(
            ActionTypes.TOGGLE_LABELS,
            { areLabelsVisible }
        )
    )

    /**
     * Toggle visibility of light.
     * @param isLightVisible Light is visible.
     */
    public static toggleLight = (isLightVisible: boolean) => (
        Redux.setAction(
            ActionTypes.TOGGLE_LABELS,
            { isLightVisible }
        )
    )

    /**
     * Toggle visibility of orbits.
     * @param areOrbitsVisible Orbits are visible.
     */
    public static toggleOrbits = (areOrbitsVisible: boolean) => (
        Redux.setAction(
            ActionTypes.TOGGLE_ORBITS,
            { areOrbitsVisible }
        )
    )

}

export default UniverseActions

