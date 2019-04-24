import Route from '../../../Utils/Route'
import ApprovalModel from '../../../Models/ApprovalModel'

export default {
    put: Route.all(({ params }) => ApprovalModel.approve(params.approvalId))
}