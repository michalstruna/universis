import { DatabaseModels } from '../Constants'
import EntityModel from './EntityModel'

export default new EntityModel<Universis.Notification, Universis.Notification, Universis.Notification.New>({
    dbModel: DatabaseModels.NOTIFICATION
})