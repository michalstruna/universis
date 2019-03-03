declare namespace Universis {

    /**
     * @interface Server Class for work with Express server.
     */
    export interface Server {

        /**
         * Set path for static files.
         * @param path Path of static files.
         */
        setStatic(path: string): void

        /**
         * Set API documentation with swagger.
         * @param document Swagger document.
         * @param controllersPath Path of controllers.
         * @param docPath Path of documentation.
         */
        setRoutes(document: Universis.Map<any>, controllersPath: string, docPath: string): void

        /**
         * Run server.
         * @param port Port of server.
         */
        run(port: number): void

    }

}