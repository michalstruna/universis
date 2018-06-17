import * as BodyParser from 'body-parser'
import * as Compression from 'compression'
import * as Express from 'express'
import { Z_DEFAULT_COMPRESSION } from 'zlib'

class Server implements IServer {

    /**
     * @var express Instance of Express framework.
     */
    private express: Express.Express

    constructor() {
        this.express = Express()
        this.express.use(BodyParser.json())
        this.express.use(Compression(Z_DEFAULT_COMPRESSION))
    }

    public getRouter(): Express.Express {
        return this.express
    }

    public setStatic(path: string) {
        this.express.use(Express.static(path))
    }

    public run(port: number): void {
        const runningServer = this.express.listen(port, () => {
            const info: any = runningServer.address()
            console.log(`Server is running on ${info.address}:${info.port}.`)
        })
    }

}

export default Server