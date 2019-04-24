import ActionTypes from './ActionTypes'
import { Redux, Request } from '../../Utils'

/**
 *
 */
export const getApprovals = () => (
    Redux.asyncAction(
        ActionTypes.GET_APPROVALS,
        { approvals: Request.get(`approvals`) }
    )
)

/**
 * Approve item.
 * @param approvalId
 */
export const approve = (approvalId: string) => (
    Redux.asyncAction(
        ActionTypes.APPROVE,
        { approve: Request.put(`approvals/${approvalId}/approve`) }
    )
)

/**
 * Disapprove item.
 * @param approvalId
 */
export const disapprove = (approvalId: string) => (
    Redux.asyncAction(
        ActionTypes.DISAPPROVE,
        { approve: Request.put(`approvals/${approvalId}/disapprove`) }
    )
)

/**
 * Remove local approval.
 * @param notificationId
 */
export const receiveRemoveApproval = (notificationId: string) => (
    Redux.setAction(
        ActionTypes.RECEIVE_REMOVE_APPROVAL,
        { approvals: { payload: { $remove: approval => approval.notification._id === notificationId } } }
    )
)

/**
 * Add local approval.
 * @param approval
 */
export const receiveApproval = (approval: Universis.Approval) => (
    Redux.setAction(
        ActionTypes.RECEIVE_APPROVAL,
        { approvals: { payload: { $add: approval } } }
    )
)