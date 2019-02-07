declare namespace Universis {

    /**
     * Interface for event.
     */
    export interface Event extends Event.New {

        /**
         * ID of event.
         */
        _id: string

    }

    export namespace Event {

        /**
         * Interface for new event.
         */
        export interface New {

            /**
             * Title of event.
             */
            title: string

            /**
             * Description of event. (optional)
             */
            description?: string

            /**
             * Start time of event. (optional)
             */
            from: number

            /**
             * End time of event. (optional)
             */
            to?: number

        }

    }

}