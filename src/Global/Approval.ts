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

}