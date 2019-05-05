declare namespace Universis {

    export interface User extends User.Simple {

        /**
         * Count of posts by body.
         */
        posts: [{
            body: string,
            count: number
        }],

        /**
         * Count of in and out post votes.
         */
        votes: {
            in: {
                positive: number
                negative: number
            },
            out: {
                positive: number
                negative: number
            }
        }

        createdAt: number

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
            password?: string

            /**
             * Data.
             */
            isFemale?: boolean
            born?: number
            home?: string
            publicEmail?: string
            website?: string
            facebook?: string
            about?: string

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
             * User's image's url. (optional)
             */
            avatar?: string

            /**
             * Roles of user.
             */
            role: number

            /**
             * Score of user.
             */
            score: Score

            /**
             * Data.
             */
            lastOnline?: number
            isOnline?: boolean

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