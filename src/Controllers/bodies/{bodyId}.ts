import BodyModel from '../../Models/BodyModel'
import { process } from '../../Utils/Response'

export default {

    get: process(({ params }) => (
        BodyModel.getBody(params.bodyId)
    )),

    put: process(({ params, body }) => (
        BodyModel.updateBody(params.bodyId, body)
    )),

    delete: process(({ params }) => (
        BodyModel.removeBody(params.bodyId))
    )

}