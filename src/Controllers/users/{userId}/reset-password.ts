import Route from '../../../Utils/Route'
import SecurityModel from '../../../Models/SecurityModel'

export default {
    post: Route.all(({ params }) => SecurityModel.resetPassword(params.userId), false)
}