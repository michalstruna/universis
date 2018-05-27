import * as Express from 'express'

/**
 * @class Server Class for work with Express server.
 */
class Server {

    /**
     * @var express Instance of Express framework.
     */
    private express: Express.Express

    /**
     * @var expressRouter Router of server.
     */
    private expressRouter: Express.Router

    public constructor() {
        this.express = Express()
        this.expressRouter = Express.Router()
        this.express.use('/', this.expressRouter)
    }

    /**
     * Getter for router of server.
     * @returns Router
     */
    public get router(): Express.Router {
        return this.expressRouter
    }

    /**
     * Set path for static files.
     * @param path Path of static files.
     */
    public set static(path: string) {
        this.express.use(Express.static(path))
    }

    /**
     * Run server.
     * @param port Port of server.
     */
    public run(port: number): void {
        const runningServer = this.express.listen(port, () => {
            const info: any = runningServer.address()
            console.log(`Server is running on ${info.address}:${info.port}.`)
        })
    }

}

export default Server