import BodyTypeModel from '../../Models/BodyTypeModel'
import { process } from '../../Utils/Response'

export default {

    get: process(() => (
        BodyTypeModel.getBodyTypesCount()
    ))

}