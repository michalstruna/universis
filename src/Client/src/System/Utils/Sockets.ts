import * as SocketIo from 'socket.io-client'

import { SocketMessageType } from '../../../../Constants'
import { Config } from '../../Utils'
import Store from '../Redux/Store'
import { receiveOnlineUsers, receiveConnection, receiveDisconnection, receiveLogin, receiveLogout } from '../../User'
import { receiveNotification } from '../Redux/SystemActions'

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

        this.io.on(SocketMessageType.CONNECT, users => {
            Store.dispatch(receiveOnlineUsers(users))
            this.io.emit(SocketMessageType.CONNECT, Store.getState().user.identity.payload)
        })

        this.io.on(SocketMessageType.NEW_CLIENT, user => {
            Store.dispatch(receiveConnection(user))
        })

        this.io.on(SocketMessageType.DISCONNECT, user => {
            Store.dispatch(receiveDisconnection(user))
        })

        this.io.on(SocketMessageType.NEW_NOTIFICATION, notification => {
            Store.dispatch(receiveNotification(notification))
        })

        this.io.on(SocketMessageType.UPDATE_NOTIFICATION, notification => {
            Store.dispatch(receiveNotification(notification, true))
        })

        this.io.on(SocketMessageType.LOGIN, user => {
            Store.dispatch(receiveLogin(user))
        })

        this.io.on(SocketMessageType.LOGOUT, user => {
            Store.dispatch(receiveLogout(user))
        })
    }

    public static logout(): void {
        this.io.emit(SocketMessageType.LOGOUT, Store.getState().user.identity.payload)
    }

}

export default Sockets