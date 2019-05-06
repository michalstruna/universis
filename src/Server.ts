import * as Compression from 'compression'
import * as Express from 'express'
import * as SwaggerUi from 'swagger-ui-express'
import * as OpenApi from 'express-openapi'
import * as Path from 'path'
import * as Http from 'http'
import * as ExpressFormidable from 'express-formidable'

import { Config } from './Constants'
import SwaggerDocument from './Swagger'
import SocketModel from './Models/SocketModel'

class Server implements Universis.Server {

    /**
     * @var express Instance of Express framework.
     */
    private readonly express: Express.Express

    constructor() {
        this.express = Express()
        this.express.use(Compression())

        this.express.all('*', (request, response, next) => {
            for (const i in Config.headers) {
                response.header(i, Config.headers[i])
            }

            next()
        })

        this.express.use(ExpressFormidable())
    }

    public run(port: number): void {
        const server = Http.createServer(this.express)

        const runningServer = server.listen(process.env.PORT || port, () => {
            const info: any = runningServer.address()
            SocketModel.initialize(server)
            console.log(`Server is running on ${info.address}:${info.port}.`)
        })
    }

    public setStatic(path: string): void {
        this.express.use(Express.static(path))
    }

    public setRoutes(document: Universis.Map<any>, controllersPath: string, docPath: string): void {
        this.express.use('/api-docs', SwaggerUi.serve, SwaggerUi.setup(SwaggerDocument))

        OpenApi.initialize({
            app: this.express,
            apiDoc: SwaggerDocument as any,
            paths: Path.join(__dirname, './Controllers')
        })

        this.express.get('*', (request, response) => {
            response.sendFile(Path.join(__dirname, './Public', 'index.html'))
        })
    }

}

export default Server