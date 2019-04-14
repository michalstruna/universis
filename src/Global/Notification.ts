declare namespace Universis {

    /**
     * Interface for full notification.
     */
    export interface Notification extends Notification.New, UserEntity, TimeEntity, UniqueEntity {

        /**
         * Notification is expired and invisible.
         */
        isExpired?: boolean

    }

}

declare namespace Universis.Notification {

    /**
     * Interface for new notification.
     */
    export interface New {

        /**
         * Subject (index of BODY, USER, DISCUSSION, ...).
         */
        subject: number

        /**
         * Operation (index of ADD, EDIT, DELETE, ...).
         */
        operation: number

        /**
         * Additional text (name of subject, etc.)
         */
        name?: string

        /**
         * URL of link. (optional)
         */
        link?: string

    }

}