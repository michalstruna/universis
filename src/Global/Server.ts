declare namespace Universis {

    /**
     * @interface Server Class for work with Express server.
     */
    export interface Server {

        /**
         * Set path for static files.
         * @param path Path of static files.
         */
        setStaticPath(path: string): void

        /**
         * Set path for dynamic files.
         * @param path Path of dynamic files.
         * @param maxSize Max file size [B].
         */
        setDynamicPath(path: string, maxSize: number): void

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