import * as Path from 'path'

import Server from './Server'
import { Config } from './Constants'
import SwaggerDocument from './Swagger'

const server = new Server()
server.setStaticPath(Config.file.staticPath)
server.setDynamicPath(Config.file.dynamicPath, Config.file.maxSize)
server.setRoutes(SwaggerDocument, Path.join(__dirname, './Controllers'), '/api-docs')
server.run(Config.port)