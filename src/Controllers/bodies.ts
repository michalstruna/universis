import BodyModel from '../Models/BodyModel'
import { process } from '../Utils/Response'

export default {

    get: process(({ query }) => (
        BodyModel.getBodies(
            query.order,
            query.criterion,
            parseInt(query.limit),
            parseInt(query.offset)
        )
    )),

    post: process(({ body }) => (
        BodyModel.addBody(body)
    ))

}