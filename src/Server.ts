import * as BodyParser from 'body-parser'
import * as Compression from 'compression'
import * as Express from 'express'
import { Z_DEFAULT_COMPRESSION } from 'zlib'
import * as SwaggerUi from 'swagger-ui-express'
import * as OpenApi from 'express-openapi'
import * as Path from "path";

import { Config } from './Constants'
import SwaggerDocument from "./Swagger"

class Server implements Universis.Server {

    /**
     * @var express Instance of Express framework.
     */
    private readonly express: Express.Express

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

    public run(port: number): void {
        const runningServer = this.express.listen(process.env.PORT || port, () => {
            const info: any = runningServer.address()
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