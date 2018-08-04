import BodyModel from '../../Models/BodyModel'
import { process, processWithoutResponse } from '../../Utils/Response'

export default {

    get: process(({ params }) => (
        BodyModel.getBody(params.bodyId)
    )),

    put: processWithoutResponse(({ params, body }) => (
        BodyModel.updateBody(params.bodyId, body)
    )),

    delete: processWithoutResponse(({ params }) => (
        BodyModel.removeBody(params.bodyId)
    ))

}