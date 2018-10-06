import * as BodyParser from 'body-parser'
import * as Compression from 'compression'
import * as Express from 'express'
import { Z_DEFAULT_COMPRESSION } from 'zlib'

import { Config } from './Constants'

class Server implements IServer {

    /**
     * @var express Instance of Express framework.
     */
    private express: Express.Express

    constructor() {
        this.express = Express()
        this.express.use(BodyParser.json())
        this.express.use(Compression(Z_DEFAULT_COMPRESSION))

        this.express.all('*', (request, response, next) => {
            for (const i in Config.headers) {
                response.header(i, Config.headers[i])
            }

            next()
        })
    }

    public getRouter(): Express.Express {
        return this.express
    }

    public setStatic(path: string) {
        this.express.use(Express.static(path))
    }

    public run(port: number): void {
        console.log('___PORT___: ', process.env.PORT, parseInt(process.env.PORT) || port)
        const runningServer = this.express.listen(parseInt(process.env.PORT) || port, '0.0.0.0', () => {
            const info: any = runningServer.address()
            console.log(`Server is running on ${info.address}:${info.port}.`)
        })
    }

}

export default Server