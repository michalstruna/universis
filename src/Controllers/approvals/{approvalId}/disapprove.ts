import Route from '../../../Utils/Route'
import ApprovalModel from '../../../Models/ApprovalModel'

export default {
    put: Route.onlyAdmin(({ params }) => ApprovalModel.disapprove(params.approvalId))
}