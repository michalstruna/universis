import MessageModel from '../Models/MessageModel'
import Route  from '../Utils/Route'

export default Route.getRouteGroupForAll(MessageModel, {
    get: Route.all,
    post: {
        access: Route.all,
        mapBefore: ({ body, userId, ip }) => ({ ...body, userId, ip })
    },
    delete: Route.onlyAdmin
})