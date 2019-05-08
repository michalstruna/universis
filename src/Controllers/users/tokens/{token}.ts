import Route from '../../../Utils/Route'
import SecurityModel from '../../../Models/SecurityModel'
import UserModel from '../../../Models/UserModel'
import TokenModel from '../../../Models/TokenModel'

export default {

    get: Route.all(({ params }) => SecurityModel.getUserByToken(params.token)),

    put: Route.all(async ({ params, body }) => {
        const data = await SecurityModel.verify(params.token)
        const updatedUser: any = {}

        if (body.password) {
            updatedUser.password = body.password
        }

        if (data.role) {
            updatedUser.role = data.role
        }

        await Promise.all([
            TokenModel.delete({ token: params.token }),
            UserModel.update({ _id: data.userId }, updatedUser)
        ])
    }, false)

}