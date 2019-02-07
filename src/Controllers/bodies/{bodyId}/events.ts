import Route from '../../../Utils/Route'
import BodyEventModel from '../../../Models/BodyEventModel'

export default Route.getRouteGroupForAll(BodyEventModel, {
    get: Route.all,
    post: { access: Route.all, mapBefore: ({ body, params }) => ({ ...body, bodyId: params.bodyId }) },
    delete: Route.all
})