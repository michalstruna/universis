import { DatabaseModels, SocketMessageTypes } from '../Constants'
import ItemModel from './ItemModel'
import SocketModel from './SocketModel'

export default new ItemModel<Universis.Message, Universis.Message, Universis.Message.New>({
    dbModel: DatabaseModels.MESSAGE,
    get: {
        joinAll: ['userId', 'targetUserId']
    },
    add: {
        onAfter: message => SocketModel.broadcast(SocketMessageTypes.NEW_MESSAGE, message)
    }
})