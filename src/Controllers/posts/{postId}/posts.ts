import Route from '../../../Utils/Route'
import BodyPostModel from '../../../Models/BodyPostModel'

export default Route.getRouteGroupForAll(BodyPostModel, {
    get: { access: Route.all, filter: ({ params }) => ({ discussionId: params.postId }) },
    post: {
        access: Route.all,
        mapBefore: ({ body, userId, ip, params }) => ({ ...body, userId, ip, discussionId: params.postId })
    },
    delete: Route.all
})