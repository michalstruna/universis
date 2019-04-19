import { DatabaseModels, SocketMessageType } from '../Constants'
import SocketModel from './SocketModel'
import Model from './Model'

const queryOptions = {
    join: ['userId']
}

class NotificationModel extends Model implements Universis.Item.Model<Universis.Notification, Universis.Notification, Universis.Notification.New> {

    public constructor() {
        super()
        this.dbModel = this.db.getModel(DatabaseModels.NOTIFICATION)
    }

    public async add(item: Universis.Notification.New): Promise<Universis.Notification> {
        const notification = await this.dbModel.addOne<Universis.Notification>(item)
        const fullNotification = await this.get({ _id: notification._id })
        SocketModel.broadcast(SocketMessageType.NEW_NOTIFICATION, fullNotification)
        return fullNotification
    }

    public count(filter: Universis.Database.Query.Filter): Promise<number> {
        return undefined
    }

    public getAll(filter: Universis.Database.Query.Filter, options?: Universis.Database.Query.Options): Promise<Universis.Notification[]> {
        return this.dbModel.get<Universis.Notification>(filter, { ...options, ...queryOptions })
    }

    public get(filter: Universis.Database.Query.Filter, options?: Universis.Database.Query.Options): Promise<Universis.Notification> {
        return this.dbModel.getOne<Universis.Notification>(filter, { ...options, ...queryOptions })
    }

    public delete(filter: Universis.Database.Query.Filter, options?: Universis.Database.Query.Options): Promise<void> {
        return undefined
    }

    public update(filter: Universis.Database.Query.Filter, changes: Universis.Notification.New, options?: Universis.Database.Query.Options): Promise<void> {
        return undefined
    }

}

export default new NotificationModel()