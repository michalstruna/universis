declare namespace Universis {

    /**
     * Approval.
     */
    export interface Approval extends Approval.New, Universis.UniqueEntity {

        notificationId: never

        notification: Universis.Notification

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
         * Any custom data before change.
         */
        before?: any

        /**
         * Any custom data after change.
         */
        after?: any

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
         * Get approval by filter.
         * @param filter
         */
        get(filter: Universis.Database.Query.Filter): Promise<Approval>

        /**
         * Get all approvals.
         * @returns approvals.
         */
        getAll(): Promise<Approval[]>

    }

}