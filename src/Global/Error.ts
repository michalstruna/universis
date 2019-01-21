declare namespace Universis {

    /**
     * Interface for error object.
     */
    export interface Error {

        /**
         * Name of error.
         */
        name: string

        /**
         * HTTP status code.
         */
        code: number

        /**
         * Code in MongoDB.
         */
        mongoCode?: number

    }

}