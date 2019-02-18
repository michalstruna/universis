import Route from '../../../Utils/Route'
import BodyPostModel from '../../../Models/BodyPostModel'

export default Route.getRouteGroupForAll(BodyPostModel, {
    get: { access: Route.all, filter: ({ params }) => ({ bodyId: params.bodyId }) },
    post: {
        access: Route.all,
        mapBefore: ({ body, userId, ip, params }) => ({ ...body, userId, ip, bodyId: params.bodyId })
    },
    delete: Route.all
})