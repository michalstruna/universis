import Server from './Server'

// TODO: Move to config.
const PORT = 3000

const server = new Server()

server.router.get('/', (request, response) => {

})

server.run(PORT)