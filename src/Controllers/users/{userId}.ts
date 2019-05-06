import UserModel from '../../Models/UserModel'
import Route from '../../Utils/Route'
import { UserRole } from '../../Constants'

export default Route.getRouteGroupForOne(UserModel, {
    get: Route.all,
    put: {
        access: Route.custom(({ user, params }) => user && (user.role === UserRole.ADMIN || user._id.toString() === params.userId)),
        mapBefore: async ({ body, files, user }) => {
            const { name, publicEmail, facebook, isFemale, website, role, about, avatar, born, home } = body
            const data: any = { name, publicEmail, facebook, isFemale, website, role, about, avatar, born, home }

            if (body.password) {
                data.password = body.password
            }

            if (user.role === UserRole.ADMIN) {
                data.role = body.role
            }

            if (data.isFemale === '') {
                data.isFemale = null
            }

            if (files && files.avatar) {
                data.avatar = files.avatar.path.split('/').pop()
            }

            return data
        }
    },
    delete: Route.onlyAdmin
})