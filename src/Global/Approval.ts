declare namespace Universis {

    /**
     * Approval.
     */
    export interface Approval extends Approval.New, Universis.UniqueEntity {

    }

}

declare namespace Universis.Approval {

    /**
     * New approval.
     */
    export interface New {

        /**
         * ID of notification.
         */
        notificationId: string

        /**
         * Any custom data.
         */
        data: any

    }

    export interface Model {

        /**
         * Add new item to approval.
         * @param approval
         */
        add(approval: Approval.New): Promise<Approval>

        /**
         * Approve item.
         * @param approvalId
         */
        approve(approvalId: string): Promise<void>

        /**
         * Disapprove item.
         * @param approvalId
         */
        disapprove(approvalId: string): Promise<void>

        /**
         * Get all approvals.
         * @returns approvals.
         */
        getAll(): Promise<Approval[]>

    }

}