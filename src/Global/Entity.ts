declare namespace Universis {

    /**
     * Entity with logging creation and last update time.
     */
    export interface TimeEntity {

        /**
         * Time of creation.
         */
        createdAt: number

        /**
         * Time of last update.
         */
        updatedAt: number

    }

    /**
     * Entity with unique identifier.
     */
    export interface UniqueEntity {

        /**
         * ID of entity.
         */
        _id: string

    }

    /**
     * Entity assigned to user.
     */
    export interface UserEntity {

        /**
         * User. (optional)
         */
        user?: User.Simple

    }

}