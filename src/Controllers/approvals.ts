import Route from '../Utils/Route'
import ApprovalModel from '../Models/ApprovalModel'

export default {
    get: Route.all(() => ApprovalModel.getAll())
}