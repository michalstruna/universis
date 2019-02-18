import Route from '../../../Utils/Route'
import PostVoteModel from '../../../Models/PostVoteModel'

export default Route.getRouteGroupForOne(PostVoteModel, {
    get: Route.all,
    put: Route.all,
    delete: Route.all
})