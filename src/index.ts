import * as Path from 'path'

import ApiController from './Controllers/ApiController'
import ApiModel from './Models/ApiModel'
import Server from './Server'
import { Config, Routes } from './Constants'

const server = new Server()
server.setStatic(Path.join(__dirname, '../src/Client/Public'))

server.getRouter().use(Routes.API.PATH, ApiController(new ApiModel()))

server.getRouter().get(Routes.ALL.PATH, (request, response) => {
    response.sendFile(Path.join(__dirname, './Client/Public', 'index.html'))
})

server.run(Config.port)