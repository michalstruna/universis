import * as Path from 'path'

import ApiController from './Controllers/ApiController'
import ApiModel from './Models/ApiModel'

import Config from './Config'
import Server from './Server'
import { Routes } from './Constants'

const server = new Server()
server.setStatic(Path.join(__dirname, './Client'))

server.getRouter().use(Routes.API.PATH, ApiController(new ApiModel()))

server.run(Config.port)