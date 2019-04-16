import * as Mongoose from 'mongoose'

import { Operations } from '../Constants'
import Model from './Model'
import NotificationModel from './NotificationModel'

class ItemModel<Full, Simple, New> extends Model implements Universis.Item.Model<Full, Simple, New> {

    private options: Universis.Model.Options<Full, Simple, New>

    public constructor(options: Universis.Model.Options<Full, Simple, New>) {
        super()
        this.options = { add: {}, get: {}, remove: {}, update: {}, ...options }
        this.dbModel = this.db.getModel(options.dbModel)
    }

    public async add(items: New[]): Promise<Full[]> {
        const { add, notifications } = this.options

        if (add.onBefore) {
            await Promise.all(items.map(item => add.onBefore(item, this)))
        }

        const addedItems = await this.dbModel.add<Full>(items)

        if (notifications && add.notification) {
        //    await NotificationModel.add(addedItems.map(async item => await this.getNotificationData(item, Operations.ADD)))
        }

        if (add.onAfter) {
            await Promise.all(items.map((item, i) => add.onAfter(addedItems[i], item, this)))
        }

        return addedItems
    }

    public async addOne(item: New): Promise<Full> {
        const { add, notifications } = this.options

        if (add.onBefore) {
            await add.onBefore(item, this)
        }

        const addedItem = await this.dbModel.addOne<Full>(item)

        if (add.onAfter) {
            await add.onAfter(addedItem, item, this)
        }

        if (notifications && add.notification) {
            await NotificationModel.addOne(await this.getNotificationData(item, Operations.ADD))
        }

        return addedItem
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
            await get.onBefore(filter, options, this)
        }

        const items = await this.dbModel.get<Simple>(filter, { join: get.joinAll, select: get.selectAll, ...options })

        if (get.onAfter) {
            await Promise.all(items.map((item, i) => get.onAfter(items[i], filter, options, this)))
        }

        if (notifications && get.notification) {
        //    await NotificationModel.add(items.map(item => this.getNotificationData(item, Operations.GET)))
        }

        return items
    }

    public async getOne(filter: Universis.Database.Query.Filter, options?: Universis.Database.Query.Options): Promise<Full> {
        const { get, notifications } = this.options

        if (get.onBefore) {
            await get.onBefore(filter, options, this)
        }

        const item = get.custom ?
            (await this.dbModel.aggregate<Full>(get.custom(this.applyObjectIds(filter), options)))[0] :
            await this.dbModel.getOne<Full>(filter, { join: get.join, select: get.select, ...options })

        if (get.onAfter) {
            await get.onAfter(item, filter, options, this)
        }

        if (notifications && get.notification) {
            await NotificationModel.addOne(await this.getNotificationData(item, Operations.GET))
        }

        return item
    }

    public async remove(filter: Universis.Database.Query.Filter, options?: Universis.Database.Query.Options): Promise<number> {
        const { remove, notifications } = this.options

        if (remove.onBefore) {
            await remove.onBefore(filter, options, this)
        }

        const items = await this.dbModel.remove<Full>(filter, options)

        if (remove.onAfter) {
            await Promise.all(items.map((item, i) => remove.onAfter(items[i], filter, options, this)))
        }

        if (notifications && remove.notification) {
        //    await NotificationModel.add(items.map(item => this.getNotificationData(item, Operations.REMOVE)))
        }

        return null
    }

    public async removeOne(filter: Universis.Database.Query.Filter, options?: Universis.Database.Query.Options): Promise<void> {
        const { remove, notifications } = this.options

        if (remove.onBefore) {
            await remove.onBefore(filter, options, this)
        }

        const item = await this.dbModel.removeOne<Full>(filter, options)

        if (notifications && remove.notification) {
            await NotificationModel.addOne(await this.getNotificationData(item, Operations.REMOVE))
        }


        if (remove.onAfter) {
            await remove.onAfter(item, filter, options, this)
        }

        return null
    }

    public async update(filter: Universis.Database.Query.Filter, changes: New, options?: Universis.Database.Query.Options): Promise<number> {
        const { update, notifications } = this.options

        if (update.onBefore) {
            await update.onBefore(changes, filter, options, this)
        }

        const items = await this.dbModel.update<Full>(filter, changes, options)

        if (update.onAfter) {
            await Promise.all(items.map((item, i) => update.onAfter(items[i], changes, filter, options, this)))
        }

        if (notifications && update.notification) {
        //    await NotificationModel.add(items.map(item => this.getNotificationData(item, Operations.UPDATE)))
        }

        return null
    }

    public async updateOne(filter: Universis.Database.Query.Filter, changes: New, options?: Universis.Database.Query.Options): Promise<void> {
        const { update, notifications } = this.options

        if (update.onBefore) {
            await update.onBefore(changes, filter, options, this)
        }

        const item = await this.dbModel.updateOne<Full>(filter, changes, options)

        if (update.onAfter) {
            await update.onAfter(item, changes, filter, options, this)
        }

        if (notifications && update.notification) {
            await NotificationModel.addOne(await this.getNotificationData(item, Operations.UPDATE))
        }

        return null
    }

    /**
     * Add ObjectId to all valid ids.
     * @param filter
     * @returns New filter.
     */
    private applyObjectIds(filter: Universis.Database.Query.Filter): Universis.Database.Query.Filter {
        for (const i in filter) {
            if (Mongoose.Types.ObjectId.isValid(filter[i]) && !filter[i].toString().includes(' ')) {
                filter[i] = Mongoose.Types.ObjectId(filter[i].toString())
            }
        }

        return filter
    }

    /**
     * Get data for new notification.
     * @param item
     * @param operation
     */
    private async getNotificationData(item: New | Simple | Full, operation: number): Promise<Universis.Notification.New> {
        const { userIdAccessor, subjectTypeAccessor, subjectNameAccessor, targetUserIdAccessor, linkAccessor, textAccessor } = this.options.notifications

        return {
            operation,
            subjectType: await subjectTypeAccessor(item, this),
            subjectName: subjectNameAccessor ? await subjectNameAccessor(item, this) : undefined,
            userId: userIdAccessor ? await userIdAccessor(item, this) : undefined,
            targetUserId: targetUserIdAccessor ? await targetUserIdAccessor(item, this) : undefined,
            text: textAccessor ? await textAccessor(item, this) : undefined,
            link: linkAccessor ? await linkAccessor(item, this) : undefined
        }
    }


}

export default ItemModel