declare namespace Universis {

    /**
     * Interface for Discussion.
     */
    export interface Discussion extends Discussion.New {

        /**
         * ID of post.
         */
        _id: string

        /**
         * Author of post.
         */
        user: Universis.User.Simple

        /**
         * List of users that agree with post.
         */
        agreements: Universis.User.Simple[]

        /**
         * List of users that disagree with post.
         */
        disagreements: Universis.User.Simple[]

        /**
         * List of answers.
         */
        answers: Answer[]

        /**
         * Date of creation-
         */
        date: string

        /**
         * Answers of discussion are visible.
         */
        isExpanded: boolean

    }

    /**
     * Interface for answer to another post.
     */
    export interface Answer extends Answer.New {

        /**
         * ID of post.
         */
        _id: string

        /**
         * Author of post.
         */
        user: Universis.User.Simple

        /**
         * List of users that agree with post.
         */
        agreements: Universis.User.Simple[]

        /**
         * List of users that disagree with post.
         */
        disagreements: Universis.User.Simple[]

        /**
         * List of answers.
         */
        answers: Answer[] // TODO: Remove.

        /**
         * Date of creation-
         */
        date: string

    }

    export namespace Discussion {

        export interface New {

            /**
             * Post title.
             */
            title: string

            /**
             * Parent body.
             */
            bodyId: string

            /**
             * Content of post.
             */
            content: string

        }

    }

    export namespace Answer {

        export interface New {

            /**
             * Parent post.
             */
            discussionId: string

            /**
             * Content of post.
             */
            content: string

        }

    }

}