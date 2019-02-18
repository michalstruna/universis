import Route from '../../../Utils/Route'
import PostVoteModel from '../../../Models/PostVoteModel'

export default Route.getRouteGroupForAll(PostVoteModel, {
    get: { access: Route.all, filter: ({ params }) => ({ postId: params.postId }) },
    post: {
        access: Route.all,
        mapBefore: ({ body, userId, params }) => ({ ...body, userId: '5c682cc8f235006303459c60', postId: params.postId })
    },
    delete: Route.all
})