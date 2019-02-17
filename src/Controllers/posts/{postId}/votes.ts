import Route from '../../../Utils/Route'
import BodyPostModel from '../../../Models/BodyPostModel'

export default Route.getRouteGroupForAll(BodyPostModel, {
    get: { access: Route.all, filter: ({ params }) => ({ postId: params.postId }) },
    post: {
        access: Route.all,
        mapBefore: ({ body, userId, params }) => ({ ...body, userId, postId: params.postId })
    },
    delete: Route.all
})