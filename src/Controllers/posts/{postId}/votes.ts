import Route from '../../../Utils/Route'
import PostVoteModel from '../../../Models/PostVoteModel'

export default Route.getRouteGroupForAll(PostVoteModel, {
    get: { access: Route.all, filter: ({ params }) => ({ postId: params.postId }) },
    post: {
        access: Route.onlyAuthenticated,
        mapBefore: ({ body, params }) => ({ ...body, postId: params.postId })
    },
    delete: Route.onlyAdmin
})