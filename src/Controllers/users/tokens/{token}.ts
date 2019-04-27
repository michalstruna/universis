import Route from '../../../Utils/Route'
import SecurityModel from '../../../Models/SecurityModel'
import UserModel from '../../../Models/UserModel'
import TokenModel from '../../../Models/TokenModel'

export default {

    get: Route.all(({ params }) => SecurityModel.getUserByToken(params.token)),

    put: Route.all(async ({ params, body }) => {
        const data = await SecurityModel.verify(params.token)

        await Promise.all([
            TokenModel.delete({ token: params.token }),
            UserModel.update({ _id: data.userId }, { password: body.password })
        ])
    }, false)

}