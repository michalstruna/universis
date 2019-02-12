import { Request, Redux } from '../../Utils'
import ActionTypes from './ActionTypes'

/**
 * Get all bodies.
 */
export const getBodies = () => (
    Redux.asyncAction(
        ActionTypes.GET_BODIES,
        { bodies: Request.get<ISimpleBody[]>(`bodies`, { sort: '_id' }) }
    )
)

/**
 * Get body by ID.
 * @param bodyId ID of body.
 */
export const getBodyById = (bodyId: string) => (
    Redux.asyncAction(
        ActionTypes.GET_BODY_BY_ID,
        { body: Request.get<ISimpleBody>(`bodies/${bodyId}`) }
    )
)

/**
 * Select body.
 * @param selectedBody ID of selected body.
 */
export const selectBody = (selectedBody: string) => (
    Redux.setAction(
        ActionTypes.SELECT_BODY,
        { selectedBody }
    )
)

/**
 * Change view size of camera.
 * @param viewSize New view size.
 */
export const changeViewSize = (viewSize: number) => (
    Redux.setAction(
        ActionTypes.CHANGE_VIEW_SIZE,
        { viewSize }
    )
)

/**
 * Toggle visibility of labels.
 * @param areLabelsVisible Labels are visible.
 */
export const toggleLabels = (areLabelsVisible: boolean) => (
    Redux.setAction(
        ActionTypes.TOGGLE_LABELS,
        { areLabelsVisible }
    )
)

/**
 * Toggle visibility of light.
 * @param isLightVisible Light is visible.
 */
export const toggleLight = (isLightVisible: boolean) => (
    Redux.setAction(
        ActionTypes.TOGGLE_LABELS,
        { isLightVisible }
    )
)

/**
 * Toggle visibility of orbits.
 * @param areOrbitsVisible Orbits are visible.
 */
export const toggleOrbits = (areOrbitsVisible: boolean) => (
    Redux.setAction(
        ActionTypes.TOGGLE_ORBITS,
        { areOrbitsVisible }
    )
)

/**
 * Get body events.
 * @param bodyId ID of body.
 */
export const getEvents = (bodyId: string) => (
    Redux.asyncAction(
        ActionTypes.GET_EVENTS,
        { events: Request.get<Universis.Event>(`bodies/${bodyId}/events`) }
    )
)

/**
 * Toggle topic.
 * @param topicId ID of topic.
 * @param isExpanded Answers of topic should be visible.
 */
export const toggleTopic = (topicId: string, isExpanded: boolean) => (
    Redux.toggleAction(
        ActionTypes.TOGGLE_TOPIC,
        { posts: { payload: { $find: topic => topic._id === topicId, isExpanded } } }
    )
)

/**
 * Toggle disagreement with post.
 * @param score Negative is vote down, positive is vote up.
 * @param isTrue
 * @param postId
 * @param parentId
 */
export const vote = (score: number, isTrue: boolean, postId: string, parentId?: string) => (
    dispatch => {
        if (isTrue) {
            dispatch(vote(-score, false, postId, parentId))
        }

        const findParent = item => item._id === parentId
        const findPost = item => item._id === postId
        const group = score > 0 ? 'agreements' : 'disagreements'

        let query: any = {
            $find: findPost,
            [group]: isTrue ? { $add: { _id: 'myself' } } : { $remove: item => item._id === 'myself' }
        }

        if (parentId) {
            query = { $find: findParent, answers: query }
        }

        return dispatch(
            Redux.setAction(
                score > 0 ? ActionTypes.VOTE_UP : ActionTypes.VOTE_DOWN,
                { posts: { payload: query } }
            )
        )
    }
)

export const addAnswer = (answer: Universis.Answer.New) => (
    dispatch => {
        const newAnswer = {
            _id: Math.random().toString(), date: new Date().toISOString(), user: {
                avatar: 'https://i.pinimg.com/originals/3d/af/bb/3dafbbca852add94c6b2af6e4c01881d.jpg',
                name: 'Michal',
                score: {
                    gold: 12,
                    silver: 1329,
                    bronze: 12347,
                    karma: 15
                }
            }, ...answer, answers: [], agreements: [], disagreements: []
        }

        return dispatch(
            Redux.setAction(
                ActionTypes.ADD_ANSWER,
                { posts: { payload: { $find: topic => topic._id === answer.topicId, answers: { $add: newAnswer } } } }
            )
        )
    }
)

/**
 * Toggle new discussion form.
 * @param isNewDiscussionExpanded
 */
export const toggleNewDiscussion = (isNewDiscussionExpanded: boolean) => (
    Redux.toggleAction(
        ActionTypes.TOGGLE_NEW_DISCUSSION,
        { isNewDiscussionExpanded }
    )
)