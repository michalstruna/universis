import BodyModel from '../../Models/BodyModel'
import { process } from '../../Utils/Response'

export default {

    get: process(() => BodyModel.getBodiesCount())

}