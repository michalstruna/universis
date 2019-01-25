import { DatabaseModels } from '../Constants'
import Model from './Model'

class NotificationModel extends Model implements Universis.Item.Model<Universis.Notification, Universis.Notification, Universis.Notification.New> {

    public constructor() {
        super()
        this.dbModel = this.db.getModel(DatabaseModels.NOTIFICATION)
    }

    public add(items: Universis.Notification.New[]): Promise<string[]> {
        return this.dbModel
            .add<Universis.Notification>(items)
            .then(notifications => notifications.map(notification => notification._id))
    }

    public addOne(item: Universis.Notification.New): Promise<string> {
        return this.dbModel.addOne<Universis.Notification>(item).then(notification => notification._id)
    }

    public approve(filter: Universis.Database.Query.Filter, options?: Universis.Database.Query.Options): Promise<number> {
        return undefined
    }

    public approveOne(filter: Universis.Database.Query.Filter, options?: Universis.Database.Query.Options): Promise<void> {
        return undefined
    }

    public count(filter: Universis.Database.Query.Filter): Promise<number> {
        return undefined
    }

    public get(filter: Universis.Database.Query.Filter, options?: Universis.Database.Query.Options): Promise<Universis.Notification[]> {
        return this.dbModel.get<Universis.Notification>(filter, options)
    }

    public getOne(filter: Universis.Database.Query.Filter, options?: Universis.Database.Query.Options): Promise<Universis.Notification> {
        return undefined
    }

    public remove(filter: Universis.Database.Query.Filter, options?: Universis.Database.Query.Options): Promise<number> {
        return undefined
    }

    public removeOne(filter: Universis.Database.Query.Filter, options?: Universis.Database.Query.Options): Promise<void> {
        return undefined
    }

    public update(filter: Universis.Database.Query.Filter, changes: Universis.Notification.New, options?: Universis.Database.Query.Options): Promise<number> {
        return undefined
    }

    public updateOne(filter: Universis.Database.Query.Filter, changes: Universis.Notification.New, options?: Universis.Database.Query.Options): Promise<void> {
        return undefined
    }

}

export default new NotificationModel()