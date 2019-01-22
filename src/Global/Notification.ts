declare namespace Universis {

    /**
     * Interface for full notification.
     */
    export interface Notification extends Notification.New {

        /**
         * ID of notification. (optional)
         */
        _id: string

        /**
         * Date of notification. (optional)
         */
        date: string

    }

}

declare namespace Universis.Notification {

    /**
     * Interface for new notification.
     */
    export interface New extends Item {

        /**
         * Text of notification.
         */
        text: string

        /**
         * NotificationSubject (index of BODY, USER, DISCUSSION, ...).
         */
        subject: number

        /**
         * NotificationRelation (index of ADD, EDIT, DELETE, ...).
         */
        relation: number

        /**
         * URI of link. (optional)
         */
        target?: string

    }

}