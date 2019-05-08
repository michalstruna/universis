import Route from '../../../Utils/Route'
import BodyPostModel from '../../../Models/BodyPostModel'

export default Route.getRouteGroupForAll(BodyPostModel, {
    get: { access: Route.all, filter: ({ params }) => ({ bodyId: params.bodyId }) },
    post: {
        access: Route.all,
        mapBefore: ({ body, params }) => ({ ...body, bodyId: params.bodyId })
    },
    delete: Route.onlyAdmin
})