import NotificationModel from '../Models/NotificationModel'
import Route  from '../Utils/Route'

export default Route.getRouteGroupForAll(NotificationModel, {
    get: Route.all,
    post: Route.all,
    delete: Route.onlyAdmin
})