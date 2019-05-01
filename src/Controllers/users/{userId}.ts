import UserModel from '../../Models/UserModel'
import Route from '../../Utils/Route'
import { UserRole } from '../../Constants'

export default Route.getRouteGroupForOne(UserModel, {
    get: Route.all,
    put: {
        access: Route.custom(({ user, params }) => user && (user.role === UserRole.ADMIN || user._id.toString() === params.userId)),
        mapBefore: ({ body, user }) => {
            const { name, publicEmail, facebook, isFemale, website, role, about, avatar, born, home } = body
            const data: any = { name, publicEmail, facebook, isFemale, website, role, about, avatar, born, home }

            if (body.password) {
                data.password = body.password
            }

            if (user.role === UserRole.ADMIN) {
                data.role = body.role
            }

            return data
        }
    },
    delete: Route.onlyAdmin
})