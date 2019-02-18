import { Request, Redux } from '../../Utils'
import ActionTypes from './ActionTypes'
import { Store } from '../../System'

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