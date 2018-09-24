import Route  from '../Utils/Route'
import SecurityModel from '../Models/SecurityModel'

export default {
    post: Route.all(({ body: { email, password } }) => SecurityModel.authenticate(email, password))
}