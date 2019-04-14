import * as SocketIo from 'socket.io'

import { SocketMessageTypes } from '../Constants'

/**
 * Socket model.
 */
class SocketModel implements Universis.Socket.Model {

    /**
     * Instance of socket server.
     */
    private io: SocketIo.Server

    /**
     * Map of connected clients.
     */
    private clients: Universis.Map<{ socket: any, user: Universis.User.Simple }>

    public initialize(server: any): void {
        this.io = SocketIo(server)
        this.clients = {}

        this.io.on(SocketMessageTypes.CONNECT, socket => {
            socket.emit(SocketMessageTypes.CONNECT, Object.values(this.clients).map(client => client.user))

            socket.on(SocketMessageTypes.CONNECT, user => {
                this.clients[socket.id] = { socket, user }
                this.broadcast(SocketMessageTypes.NEW_CLIENT, user)
            })

            socket.on(SocketMessageTypes.DISCONNECT, () => {
                const io = this.clients[socket.id]

                if (io) {
                    this.broadcast(SocketMessageTypes.DISCONNECT, this.clients[socket.id].user)
                    delete this.clients[socket.id]
                }
            })
        })
    }

    public unicast(type: string, payload: Universis.Socket.Data, client: string) {
        const io = this.clients[client]

        if (io) {
            io.socket.emit(type, payload)
        }
    }

    public broadcast(type: string, payload: Universis.Socket.Data, excludeClient?: string): void {
        if (excludeClient) {
            const io = this.clients[excludeClient]

            if (io) {
                io.socket.broadcast(type, payload)
            }
        } else {
            this.io.emit(type, payload)
        }
    }

}

export default new SocketModel()