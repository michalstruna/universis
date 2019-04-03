import { Request, Redux, Queries, Url } from '../../Utils'
import ActionTypes from './ActionTypes'
import Follow from '../Constants/Follow'
import { toggleBodyEventForm } from '../../Panel'

/**
 * Get all bodies.
 */
export const getBodies = () => (
    Redux.asyncAction(
        ActionTypes.GET_BODIES,
        { bodies: Request.get<Universis.Universe.Body.Simple[]>(`bodies`, { sort: '_id' }) }
    )
)

/**
 * Get body by ID.
 * @param bodyId ID of body.
 */
export const getBodyById = (bodyId: string) => (
    Redux.asyncAction(
        ActionTypes.GET_BODY_BY_ID,
        { body: Request.get<Universis.Universe.Body.Simple>(`bodies/${bodyId}`) }
    )
)

/**
 * Select body.
 * @param selectedBody ID of selected body.
 */
export const selectBody = (selectedBody: string) => {
    Url.push({ query: { [Queries.CENTERED_BODY]: selectedBody } })
    return Redux.setAction(ActionTypes.SELECT_BODY, { selectedBody })
}

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
 * @param isNameVisible Labels are visible.
 */
export const toggleLabels = (isNameVisible: boolean) => (
    Redux.setAction(
        ActionTypes.TOGGLE_LABELS,
        { isNameVisible }
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
 * Toggle visibility of velocity.
 * @param isVelocityVisible Velocity is visible.
 */
export const toggleVelocity = (isVelocityVisible: boolean) => (
    Redux.setAction(
        ActionTypes.TOGGLE_VELOCITY,
        { isVelocityVisible }
    )
)

/**
 * Toggle visibility of from Earth.
 * @param isFromEarthVisible From Earth is visible.
 */
export const toggleFromEarth = (isFromEarthVisible: boolean) => (
    Redux.setAction(
        ActionTypes.TOGGLE_FROM_EARTH,
        { isFromEarthVisible }
    )
)

/**
 * Toggle visibility of from center.
 * @param isFromCenterVisible From center is visible.
 */
export const toggleFromCenter = (isFromCenterVisible: boolean) => (
    Redux.setAction(
        ActionTypes.TOGGLE_FROM_CENTER,
        { isFromCenterVisible }
    )
)

/**
 * Toggle visibility of from camera.
 * @param isFromCameraVisible From camera is visible.
 */
export const toggleFromCamera = (isFromCameraVisible: boolean) => (
    Redux.setAction(
        ActionTypes.TOGGLE_FROM_CAMERA,
        { isFromCameraVisible }
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
 * Toggle visibility of particles.
 * @param areParticlesVisible Particles are visible.
 */
export const toggleParticles = (areParticlesVisible: boolean) => (
    Redux.setAction(
        ActionTypes.TOGGLE_PARTICLES,
        { areParticlesVisible }
    )
)

/**
 * Toggle answers.
 * @param discussionId ID of discussion.
 * @param isExpanded Answers of discussion should be visible.
 */
export const toggleAnswers = (discussionId: string, isExpanded: boolean) => (
    Redux.toggleAction(
        ActionTypes.TOGGLE_ANSWERS,
        { body: { payload: { discussions: { $find: discussion => discussion._id === discussionId, isExpanded } } } }
    )
)

/**
 * Toggle disagreement with post.
 * @param isPositive Negative is vote down, positive is vote up.
 * @param existingVoteId
 * @param postId
 * @param parentId
 */
export const vote = (isPositive: boolean, existingVoteId: string | null, postId: string, parentId?: string) => (
    dispatch => {
        const getQuery = operation => {
            let query: any = { $find: item => item._id === postId, votes: operation }

            if (parentId) {
                query = { $find: item => item._id === parentId, answers: query }
            }

            return query
        }

        if (existingVoteId) {
            return dispatch(
                Redux.asyncAction(
                    ActionTypes.UNVOTE,
                    { newUnvote: Request.delete(`posts/votes/${existingVoteId}`) },
                    () => dispatch(
                        Redux.setAction(
                            ActionTypes.LOCAL_UNVOTE,
                            { body: { payload: { discussions: getQuery({ $remove: item => item._id === existingVoteId }) } } }
                        )
                    )
                )
            )
        } else {
            return dispatch(
                Redux.asyncAction(
                    ActionTypes.VOTE,
                    { newVote: Request.post<Universis.Vote>(`posts/${postId}/votes`, { isPositive }) },
                    newVote => {
                        dispatch(
                            Redux.setAction(
                                ActionTypes.LOCAL_UNVOTE,
                                { body: { payload: { discussions: getQuery({ $remove: vote => vote.userId === '5c682cc8f235006303459c60' && vote.postId === postId }) } } }
                            )
                        )

                        dispatch(
                            Redux.setAction(
                                ActionTypes.LOCAL_VOTE,
                                { body: { payload: { discussions: getQuery({ $add: newVote }) } } }
                            )
                        )
                    }
                )
            )
        }
    }
)

/**
 * Add new discussion to body.
 * @param discussion
 */
export const addDiscussion = (discussion: Universis.Discussion.New) => (
    async dispatch => {
        const { bodyId, ...discussionToServer } = discussion

        dispatch(toggleNewDiscussion(false))

        return dispatch(
            Redux.asyncAction(
                ActionTypes.ADD_DISCUSSION,
                { newDiscussion: Request.post(`bodies/${bodyId}/posts`, discussionToServer) },
                discussion => dispatch(
                    Redux.setAction(ActionTypes.LOCAL_ADD_DISCUSSION, {
                        body: { payload: { discussions: { $addFirst: { ...discussion, answers: [] } } } }
                    })
                )
            )
        )
    }
)

/**
 * Add answer to discussion.
 * @param answer
 */
export const addAnswer = (answer: Universis.Answer.New) => (
    dispatch => {
        const { discussionId, ...answerToServer } = answer

        return dispatch(
            Redux.asyncAction(
                ActionTypes.ADD_ANSWER,
                { newAnswer: Request.post(`posts/${discussionId}/posts`, answerToServer) },
                answer => dispatch(
                    Redux.setAction(
                        ActionTypes.LOCAL_ADD_ANSWER,
                        {
                            body: {
                                payload: {
                                    discussions: {
                                        $find: discussion => discussion._id === discussionId, answers: { $add: answer }
                                    }
                                }
                            }
                        }
                    )
                )
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

/**
 * Change time speed.
 * @param timeSpeed Current time speed.
 * @param faster True if faster, false if slower.
 */
export const changeTimeSpeed = (timeSpeed: number, faster?: boolean) => (
    dispatch => {
        if (faster === true) {
            timeSpeed = (timeSpeed === -1 ? 0 : (timeSpeed === 0 ? 1 : (timeSpeed > 0 ? timeSpeed * 10 : timeSpeed / 10)))
        } else if (faster === false) {
            timeSpeed = (timeSpeed === 1 ? 0 : (timeSpeed === 0 ? -1 : (timeSpeed < 0 ? timeSpeed * 10 : timeSpeed / 10)))
        }

        if (timeSpeed < 10e10 && timeSpeed > -10e10) {
            dispatch(
                Redux.setAction(
                    ActionTypes.CHANGE_TIME_SPEED,
                    { timeSpeed }
                )
            )
        }
    }
)

/**
 * Increase follow level (camera -> body).
 */
export const changeFollow = () => (
    Redux.setAction(
        ActionTypes.CHANGE_FOLLOW,
        ({ universe }) => ({ follow: universe.follow < Follow.MOVE_AND_ROTATION ? universe.follow + 1 : Follow.NO })
    )
)

/**
 * Add body event.
 * @param bodyId ID of body.
 * @param event New event.
 */
export const addEvent = (bodyId: string, event: Universis.Event.New) => (
    Redux.asyncAction(
        ActionTypes.ADD_EVENT,
        { newEvent: Request.post(`bodies/${bodyId}/events`, event) },
        (event, dispatch) => dispatch(toggleBodyEventForm(false))
    )
)

/**
 * Add body event.
 * @param eventId ID of event.
 * @param event New event.
 */
export const updateEvent = (eventId: string, event: Universis.Event.New) => (
    Redux.asyncAction(
        ActionTypes.ADD_EVENT,
        { updatedEvent: Request.put(`bodies/events/${eventId}`, event) },
        (event, dispatch) => dispatch(toggleBodyEventForm(false))
    )
)

/**
 * Delete body event by ID.
 * @param eventId
 */
export const deleteEvent = (eventId: string) => (
    Redux.asyncAction(
        ActionTypes.DELETE_EVENT,
        { deletedEvent: Request.delete(`bodies/events/${eventId}`) }
    )
)