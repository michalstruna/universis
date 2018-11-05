import * as Path from 'path'

import Server from './Server'
import { Config } from './Constants'
import SwaggerDocument from './Swagger'

const server = new Server()
server.setStatic(Path.join(__dirname, './Public'))
server.setRoutes(SwaggerDocument, Path.join(__dirname, './Controllers'), '/api-docs')
server.run(Config.port)