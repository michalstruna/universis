import { DatabaseModels } from '../Constants'
import ItemModel from './ItemModel'

export default new ItemModel<Universis.Notification, Universis.Notification, Universis.Notification.New>({
    dbModel: DatabaseModels.NOTIFICATION
})