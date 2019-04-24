declare namespace Universis {

    /**
     * Interface for message.
     */
    export interface Message extends Message.New, TimeEntity, UniqueEntity, UserEntity {

        /**
         * Whisper. (optional)
         */
        targetUser?: Universis.User.Simple

    }

}

declare namespace Universis.Message {

    /**
     * Interface for new message.
     */
    export interface New {

        /**
         * Text of message.
         */
        content: string

        /**
         * URI of link. (optional)
         */
        targetUserId?: string

    }

}