import Route  from '../../../Utils/Route'
import BodyEventModel from '../../../Models/BodyEventModel'

export default Route.getRouteGroupForAll(BodyEventModel, {
  //  post: Route.all(({ body, params }) => BodyEventModel)
})