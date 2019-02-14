import Route from '../../../Utils/Route'
import BodyPostModel from '../../../Models/BodyPostModel'

export default Route.getRouteGroupForAll(BodyPostModel, {
    get: Route.all,
    post: Route.all,
    delete: Route.all
})
