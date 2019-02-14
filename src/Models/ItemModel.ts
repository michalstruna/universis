import { Errors, Operations } from '../Constants'
import Model from './Model'
import NotificationModel from './NotificationModel'

class ItemModel<Full extends Universis.Item, Simple extends Universis.Item, New> extends Model implements Universis.Item.Model<Full, Simple, New> {

    private options: Universis.Model.Options<Full, Simple, New>

    public constructor(options: Universis.Model.Options<Full, Simple, New>) {
        super()
        this.options = { add: {}, get: {}, remove: {}, update: {}, ...options }
        this.dbModel = this.db.getModel(options.dbModel)
    }

    public async add(items: New[]): Promise<string[]> {
        const { add, notifications } = this.options

        if (add.onBefore) {
            await Promise.all(items.map(item => add.onBefore(item)))
        }

        const addedItems = await this.dbModel.add<Full>(items)

        if (notifications && add.notification) {
            await NotificationModel.add(addedItems.map(item => ({
                operation: Operations.ADD,
                subject: notifications.subjectAccessor(item, this),
                text: notifications.textAccessor(item, this),
                target: notifications.targetAccessor ? notifications.targetAccessor(item, this) : null
            })))
        }

        if (add.onAfter) {
            await Promise.all(items.map((item, i) => add.onAfter(addedItems[i], item)))
        }

        return addedItems.map(item => item._id)
    }

    public async addOne(item: New): Promise<string> {
        const { add, notifications } = this.options

        if (add.onBefore) {
            await add.onBefore(item)
        }

        const addedItem = await this.dbModel.addOne<Full>(item)

        if (notifications && add.notification) {
            await NotificationModel.addOne({
                operation: Operations.ADD,
                subject: notifications.subjectAccessor(addedItem, this),
                text: notifications.textAccessor(addedItem, this),
                target: notifications.targetAccessor ? notifications.targetAccessor(addedItem, this) : null
            })
        }

        if (add.onAfter) {
            await add.onAfter(addedItem, item)
        }

        return addedItem._id
    }

    public approve(filter: Universis.Database.Query.Filter, options?: Universis.Database.Query.Options): Promise<number> {
        return undefined
    }

    public approveOne(filter: Universis.Database.Query.Filter, options?: Universis.Database.Query.Options): Promise<void> {
        return undefined
    }

    public async count(filter: Universis.Database.Query.Filter): Promise<number> {
        return this.dbModel.count(filter) // TODO: Before count, after count, ...?
    }

    public async get(filter: Universis.Database.Query.Filter, options?: Universis.Database.Query.Options): Promise<Simple[]> {
        const { get, notifications } = this.options

        if (get.onBefore) {
            await get.onBefore(filter, options)
        }

        const items = await this.dbModel.get<Simple>(filter, { ...options, join: get.joinAll, select: get.selectAll })

        if (notifications && get.notification) {
            await NotificationModel.add(items.map(item => ({
                operation: Operations.GET,
                subject: notifications.subjectAccessor(item, this),
                text: notifications.textAccessor(item, this),
                target: notifications.targetAccessor ? notifications.targetAccessor(item, this) : null
            })))
        }

        if (get.onAfter) {
            await Promise.all(items.map((item, i) => get.onAfter(items[i], filter, options)))
        }

        return items
    }

    public async getOne(filter: Universis.Database.Query.Filter, options?: Universis.Database.Query.Options): Promise<Full> {
        const { get, notifications } = this.options

        if (get.onBefore) {
            await get.onBefore(filter, options)
        }

        const item = await this.dbModel.getOne<Full>(filter, { ...options, join: get.join, select: get.select })

        if (notifications && get.notification) {
            await NotificationModel.addOne({
                operation: Operations.GET,
                subject: notifications.subjectAccessor(item, this),
                text: notifications.textAccessor(item, this),
                target: notifications.targetAccessor ? notifications.targetAccessor(item, this) : null
            })
        }

        if (get.onAfter) {
            await get.onAfter(item, filter, options)
        }

        return item
    }

    public async remove(filter: Universis.Database.Query.Filter, options?: Universis.Database.Query.Options): Promise<number> {
        const { remove, notifications } = this.options

        if (remove.onBefore) {
            await remove.onBefore(filter, options)
        }

        const items = await this.dbModel.remove<Full>(filter, options)

        if (notifications && remove.notification) {
            await NotificationModel.add(items.map(item => ({
                operation: Operations.REMOVE,
                subject: notifications.subjectAccessor(item, this),
                text: notifications.textAccessor(item, this),
                target: notifications.targetAccessor ? notifications.targetAccessor(item, this) : null
            })))
        }

        if (remove.onAfter) {
            await Promise.all(items.map((item, i) => remove.onAfter(items[i], filter, options)))
        }

        return null
    }

    public async removeOne(filter: Universis.Database.Query.Filter, options?: Universis.Database.Query.Options): Promise<void> {
        const { remove, notifications } = this.options

        if (remove.onBefore) {
            await remove.onBefore(filter, options)
        }

        const item = await this.dbModel.removeOne<Full>(filter, options)

        if (notifications && remove.notification) {
            await NotificationModel.addOne({
                operation: Operations.REMOVE,
                subject: notifications.subjectAccessor(item, this),
                text: notifications.textAccessor(item, this),
                target: notifications.targetAccessor ? notifications.targetAccessor(item, this) : null
            })
        }

        if (remove.onAfter) {
            await remove.onAfter(item, filter, options)
        }

        return null
    }

    public async update(filter: Universis.Database.Query.Filter, changes: New, options?: Universis.Database.Query.Options): Promise<number> {
        const { update, notifications } = this.options

        if (update.onBefore) {
            await update.onBefore(changes, filter, options)
        }

        const items = await this.dbModel.update<Full>(filter, changes, options)

        if (notifications && update.notification) {
            await NotificationModel.add(items.map(item => ({
                operation: Operations.UPDATE,
                subject: notifications.subjectAccessor(item, this),
                text: notifications.textAccessor(item, this),
                target: notifications.targetAccessor ? notifications.targetAccessor(item, this) : null
            })))
        }

        if (update.onAfter) {
            await Promise.all(items.map((item, i) => update.onAfter(items[i], changes, filter, options)))
        }

        return null
    }

    public async updateOne(filter: Universis.Database.Query.Filter, changes: New, options?: Universis.Database.Query.Options): Promise<void> {
        const { update, notifications } = this.options

        if (update.onBefore) {
            await update.onBefore(changes, filter, options)
        }

        const item = await this.dbModel.updateOne<Full>(filter, changes, options)

        if (notifications && update.notification) {
            await NotificationModel.addOne({
                operation: Operations.UPDATE,
                subject: notifications.subjectAccessor(item, this),
                text: notifications.textAccessor(item, this),
                target: notifications.targetAccessor ? notifications.targetAccessor(item, this) : null
            })
        }

        if (update.onAfter) {
            await update.onAfter(item, changes, filter, options)
        }

        return null
    }

}

export default ItemModel