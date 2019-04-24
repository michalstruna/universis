declare namespace Universis.Socket {

    /**
     * Interface for socket model.
     */
    export interface Model {

        /**
         * Initialize socket server.
         * @param server Node (Express) server.
         */
        initialize(server: any): void

        /**
         * Send socket message to one client.
         * @param type Type of message.
         * @param payload Data of message.
         * @param client List of client's socket id.
         */
        unicast(type: string, payload: Data, client: string): void

        /**
         * Send socket message to one client.
         * @param type Type of message.
         * @param payload Data of message.
         * @param excludeClient Excluded client from broadcast.
         */
        broadcast(type: string, payload: Data, excludeClient?: string): void

    }

    /**
     * Data of socket message.
     */
    export type Data = any

}