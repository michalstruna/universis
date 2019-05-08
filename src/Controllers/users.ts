import UserModel from '../Models/UserModel'
import Route from '../Utils/Route'

export default Route.getRouteGroupForAll(UserModel, {
    get: Route.all,
    post: Route.all,
    delete: Route.onlyAdmin
})