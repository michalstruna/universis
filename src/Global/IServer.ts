/**
 * @interface Server Class for work with Express server.
 */
declare interface IServer {

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
    setRoutes(document: IObject<any>, controllersPath: string, docPath: string): void

    /**
     * Run server.
     * @param port Port of server.
     */
    run(port: number): void

}