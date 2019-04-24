declare namespace Universis {

    /**
     * Interface for full notification.
     */
    export interface Notification extends Notification.New, UserEntity, TimeEntity, UniqueEntity {

        /**
         * Notification is expired and invisible.
         */
        isExpired?: boolean

        /**
         * User's object.
         */
        user?: Universis.User.Simple

        /**
         * There is no user id, but user object, which is its ID.
         */
        userId?: never

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
        subjectType: number

        /**
         * Name of subject (Země, ...).
         */
        subjectName: string

        /**
         * Operation (index of ADD, EDIT, DELETE, ...).
         */
        operation: number

        /**
         * Id of author of event.
         */
        userId?: string

        /**
         * Notification will be only for this user.
         */
        targetUserId?: string

        /**
         * Custom text of notification.
         */
        text?: string

        /**
         * Link.
         */
        link?: string

        /**
         * Notification subject is approved.
         */
        isApproved: boolean

    }

}