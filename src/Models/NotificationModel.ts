import { ApprovalState, DatabaseModel, SocketMessageType } from '../Constants'
import SocketModel from './SocketModel'
import Model from './Model'
import ApprovalModel from './ApprovalModel'

const queryOptions = {
    join: ['userId']
}

class NotificationModel extends Model implements Universis.Item.Model<Universis.Notification, Universis.Notification, Universis.Notification.New> {

    public constructor() {
        super()
        this.dbModel = this.db.getModel(DatabaseModel.NOTIFICATION)
    }

    public async add(item: Universis.Notification.New): Promise<Universis.Notification> {
        const notification = await this.dbModel.addOne<Universis.Notification>(item)
        const fullNotification = await this.get({ _id: notification._id })

        if (item.approvalState === ApprovalState.UNAPPROVED) {
            const addedApproval = await ApprovalModel.add({
                notificationId: notification._id,
                before: item.payload.before,
                after: item.payload.after
            })

            fullNotification.payload = await ApprovalModel.get({ _id: addedApproval._id })
        }

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

    public async update(filter: Universis.Database.Query.Filter, changes: Universis.Notification.New, options?: Universis.Database.Query.Options): Promise<void> {
        const notification = await this.dbModel.updateOne<Universis.Notification>(filter, changes, options)
        const fullNotification = await this.get({ _id: notification._id })
        SocketModel.broadcast(SocketMessageType.UPDATE_NOTIFICATION, { ...fullNotification, payload: changes.payload })
    }

}

export default new NotificationModel()