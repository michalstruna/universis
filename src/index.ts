import * as Path from 'path'
import * as SwaggerUi from 'swagger-ui-express'
import * as OpenApi from 'express-openapi'

import Server from './Server'
import { Config } from './Constants'
import SwaggerDocument from './Swagger'

const server = new Server()
server.setStatic(Path.join(__dirname, './Client'))

server.getRouter().use('/api-docs', SwaggerUi.serve, SwaggerUi.setup(SwaggerDocument))

OpenApi.initialize({
    app: server.getRouter(),
    apiDoc: SwaggerDocument,
    paths: Path.join(__dirname, './Controllers')
})


server.getRouter().get('*', (request, response) => {
    response.sendFile(Path.join(__dirname, './Client', 'index.html'))
})

server.run(Config.port)