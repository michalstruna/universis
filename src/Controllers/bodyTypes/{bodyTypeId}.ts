import BodyTypeModel from '../../Models/BodyTypeModel'
import { process, processWithoutResponse } from '../../Utils/Response'

export default {

    get: process(({ params }) => (
        BodyTypeModel.getBodyType(params.bodyTypeId)
    )),

    put: processWithoutResponse(({ params, body }) => (
        BodyTypeModel.updateBodyType(params.bodyTypeId, body.name)
    )),

    delete: processWithoutResponse(({ params }) => (
        BodyTypeModel.removeBodyType(params.bodyTypeId)
    ))

}