
/**
 * @interface Server Class for work with Express server.
 */
declare interface IServer {

    /**
     * Getter for router of server.
     * @returns Router
     */
    getRouter(): any

    /**
     * Set path for static files.
     * @param path Path of static files.
     */
    setStatic(path: string): void

    /**
     * Run server.
     * @param port Port of server.
     */
    run(port: number): void

}