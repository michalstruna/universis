declare namespace Universis {

    /**
     * Interface for full notification.
     */
    export interface Notification extends Notification.New, UserEntity, TimeEntity, UniqueEntity {

        /**
         * Notification is expired and invisible.
         */
        isExpired?: boolean

        user?: Universis.User.Simple

        targetUser?: Universis.User.Simple

        body?: Universis.Universe.Body.Simple

        discussion?: Universis.Discussion

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

        userId?: string

        targetUserId?: string

        bodyId?: string

        discussionId?: string

        text?: string

    }

}