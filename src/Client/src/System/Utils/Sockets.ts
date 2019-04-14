import * as SocketIo from 'socket.io-client'

import { SocketMessageTypes } from '../../../../Constants'
import { Config } from '../../Utils'
import Store from '../Redux/Store'
import { receiveMessage, receiveOnlineUsers, receiveConnection, receiveDisconnection } from '../../User'

/**
 * Utils for sockets.
 */
class Sockets {

    /**
     * Instance of socket client.
     */
    private static io: any

    public static initialize(): void {
        this.io = SocketIo(Config.API_URL)

        this.io.on(SocketMessageTypes.CONNECT, users => {
            Store.dispatch(receiveOnlineUsers(users))
            this.io.emit(SocketMessageTypes.CONNECT, null) // TODO: Send identity.
        })

        this.io.on(SocketMessageTypes.NEW_CLIENT, user => {
            Store.dispatch(receiveConnection(user))
        })

        this.io.on(SocketMessageTypes.DISCONNECT, user => {
            Store.dispatch(receiveDisconnection(user))
        })

        this.io.on(SocketMessageTypes.NEW_MESSAGE, message => {
            Store.dispatch(receiveMessage(message))
        })
    }

}

export default Sockets