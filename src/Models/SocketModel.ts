import * as SocketIo from 'socket.io'

import Model from './Model'
import { SocketMessageType, DatabaseModel } from '../Constants'

/**
 * Socket model.
 */
class SocketModel extends Model implements Universis.Socket.Model {

    /**
     * Instance of socket server.
     */
    private io: SocketIo.Server

    /**
     * Map of connected clients.
     */
    private clients: Universis.Map<{ socket: any, user: Universis.User.Simple }>

    private userDbModel: Universis.Database.Model

    public constructor() {
        super()
        this.userDbModel = this.db.getModel(DatabaseModel.USER)
    }

    public initialize(server: any): void {
        this.io = SocketIo(server)
        this.clients = {}

        this.io.on(SocketMessageType.CONNECT, socket => {
            socket.emit(SocketMessageType.CONNECT, Object.values(this.clients).map(client => client.user))

            socket.on(SocketMessageType.CONNECT, user => {
                if (user) {
                    const userConnectionsCount = Object.values(this.clients).filter(client => client.user && client.user._id === user._id).length

                    if (userConnectionsCount === 0) {
                        this.userDbModel.updateOne({ _id: user._id }, { isOnline: true })
                    }
                }

                this.clients[socket.id] = { socket, user }
                this.broadcast(SocketMessageType.NEW_CLIENT, user)
            })

            socket.on(SocketMessageType.DISCONNECT, () => {
                const io = this.clients[socket.id]

                if (io) {
                    const user = this.clients[socket.id].user
                    this.broadcast(SocketMessageType.DISCONNECT, user ? user._id : null)
                    delete this.clients[socket.id]

                    if (user) {
                        const userConnectionsCount = Object.values(this.clients).filter(client => client.user && client.user._id === user._id).length

                        if (userConnectionsCount === 1) {
                            this.userDbModel.updateOne({ _id: user._id }, {
                                isOnline: false,
                                lastOnline: new Date().getTime()
                            })
                        }
                    }
                }
            })

            socket.on(SocketMessageType.LOGOUT, user => {
                this.userDbModel.updateOne({ _id: user._id }, {
                    isOnline: false,
                    lastOnline: new Date().getTime()
                })

                this.clients[socket.id].user = null
                this.broadcast(SocketMessageType.LOGOUT, user)
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