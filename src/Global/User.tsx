declare namespace Universis {

    export interface User extends User.Simple {



    }

    export namespace User {

        /**
         * Interface for new user.
         */
        export interface New {

            /**
             * Email of user.
             */
            email: string

            /**
             * Password of user.
             */
            password: string

        }

        export interface Simple extends New {

            /**
             * User's ID.
             */
            _id?: string

            /**
             * User's email.
             */
            email: string

            /**
             * Name of user. Default is email.
             */
            name: string

            /**
             * User's image's url.
             */
            avatar: string

            /**
             * Roles of user.
             */
            roles: {
                [index: number]: number,
                includes: (number) => boolean
            }

            /**
             * Score of user.
             */
            score: Score

        }

        /**
         * Interface for user score.
         */
        export interface Score {

            /**
             * Count of gold medals.
             */
            gold: number

            /**
             * Count of silver medals.
             */
            silver: number

            /**
             * Count of bronze medals.
             */
            bronze: number

            /**
             * Karma of user (rating another users, bans, ...).
             */
            karma: number

        }

        /**
         * interface for user identity.
         * This is only for owner user.
         * Nobody else shouldn't know user's token.
         */
        export interface Identity extends Simple {

            /**
             * Temporally access token of user.
             */
            token: string

        }

    }

}