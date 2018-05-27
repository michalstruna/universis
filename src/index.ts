import Config from './Config'
import Server from './Server'
import * as Path from 'path'

const server = new Server()
server.static = Path.join(__dirname, './client')

server.router.get('/', (request, response) => {

})

server.run(Config.port)