import Route from '../../../Utils/Route'
import BodyPostModel from '../../../Models/BodyPostModel'

export default Route.getRouteGroupForAll(BodyPostModel, {
    get: Route.all,
    post: {
        access: Route.all,
        mapBefore: ({ body, userId, ip }) => {
            return ({ ...body, userId, ip })
        }
    },
    delete: Route.all
})