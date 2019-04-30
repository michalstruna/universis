import UserModel from '../../Models/UserModel'
import Route from '../../Utils/Route'
import { UserRole } from '../../Constants'

export default Route.getRouteGroupForOne(UserModel, {
    get: Route.all,
    put: Route.custom(({ user, params }) => user && (user.role === UserRole.ADMIN || user._id === params.userId)), // Only owner of account or admin.
    delete: Route.onlyAdmin
})