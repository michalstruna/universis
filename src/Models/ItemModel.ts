import * as Mongoose from 'mongoose'

import { ApprovalState, Operation } from '../Constants'
import Model from './Model'
import NotificationModel from './NotificationModel'
import ApprovalModel from './ApprovalModel'

class ItemModel<Full, Simple, New> extends Model implements Universis.Item.Model<Full, Simple, New> {

    private options: Universis.Model.Options<Full, Simple, New>

    public constructor(options: Universis.Model.Options<Full, Simple, New>) {
        super()
        this.options = { add: {}, get: {}, remove: {}, update: {}, ...options }
        this.dbModel = this.db.getModel(options.dbModel)
    }

    public async add(item: New): Promise<Full> {
        const { add, notifications } = this.options
        let addedItem

        if (!add.approval) {
            if (add.onBefore) {
                await add.onBefore(item, this)
            }

            addedItem = await this.dbModel.addOne<Full>(item)

            if (add.onAfter) {
                await add.onAfter(addedItem, item, this)
            }
        }

        if (notifications && add.notification) {
            const notification = await NotificationModel.add(await this.getNotificationData(item, Operation.ADD, !add.approval))

            if (add.approval) {
                await ApprovalModel.add({ notificationId: notification._id, data: item })
            }
        }

        return addedItem
    }

    public async count(filter: Universis.Database.Query.Filter): Promise<number> {
        return this.dbModel.count(filter)
    }

    public async getAll(filter: Universis.Database.Query.Filter, options?: Universis.Database.Query.Options): Promise<Simple[]> {
        const { get } = this.options

        if (get.onBefore) {
            await get.onBefore(filter, options, this)
        }

        const items = await this.dbModel.get<Simple>(filter, { join: get.joinAll, select: get.selectAll, ...options })

        if (get.onAfter) {
            await Promise.all(items.map((item, i) => get.onAfter(items[i], filter, options, this)))
        }

        return items
    }

    public async get(filter: Universis.Database.Query.Filter, options?: Universis.Database.Query.Options): Promise<Full> {
        const { get } = this.options

        if (get.onBefore) {
            await get.onBefore(filter, options, this)
        }

        const item = get.custom ?
            (await this.dbModel.aggregate<Full>(get.custom(this.applyObjectIds(filter), options)))[0] :
            await this.dbModel.getOne<Full>(filter, { join: get.join, select: get.select, ...options })

        if (get.onAfter) {
            await get.onAfter(item, filter, options, this)
        }

        return item
    }

    public async delete(filter: Universis.Database.Query.Filter, options?: Universis.Database.Query.Options): Promise<void> {
        const { remove, notifications } = this.options
        let item

        if (!remove.approval) {
            if (remove.onBefore) {
                await remove.onBefore(filter, options, this)
            }

            item = await this.dbModel.removeOne<Full>(filter, options)

            if (remove.onAfter) {
                await remove.onAfter(item, filter, options, this)
            }
        }

        if (notifications && remove.notification) {
            if (!item) {
                item = await this.dbModel.getOne(filter, options)
            }

            const notification = await NotificationModel.add(await this.getNotificationData(item, Operation.DELETE, !remove.approval))

            if (remove.approval) {
                await ApprovalModel.add({ notificationId: notification._id, data: item })
            }
        }

        return null
    }

    public async update(filter: Universis.Database.Query.Filter, changes: New, options?: Universis.Database.Query.Options): Promise<void> {
        const { update, notifications } = this.options
        let item

        if (!update.approval) {
            if (update.onBefore) {
                await update.onBefore(changes, filter, options, this)
            }

            item = await this.dbModel.updateOne<Full>(filter, changes, options)

            if (update.onAfter) {
                await update.onAfter(item, changes, filter, options, this)
            }
        }

        if (notifications && update.notification) {
            if (!item) {
                item = await this.dbModel.getOne(filter, options)
            }

            const newItem = { ...item, ...(changes as any) }
            const notification = await NotificationModel.add(await this.getNotificationData(newItem, Operation.UPDATE, !update.approval))

            if (update.approval) {
                await ApprovalModel.add({ notificationId: notification._id, data: newItem })
            }
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
     * @param isApproved
     */
    private async getNotificationData(item: New | Simple | Full, operation: number, isApproved: boolean): Promise<Universis.Notification.New> {
        const { userIdAccessor, subjectTypeAccessor, subjectNameAccessor, targetUserIdAccessor, linkAccessor, textAccessor } = this.options.notifications

        return {
            operation,
            subjectType: await subjectTypeAccessor(item, this),
            subjectName: subjectNameAccessor ? await subjectNameAccessor(item, this) : undefined,
            userId: userIdAccessor ? await userIdAccessor(item, this) : undefined,
            targetUserId: targetUserIdAccessor ? await targetUserIdAccessor(item, this) : undefined,
            text: textAccessor ? await textAccessor(item, this) : undefined,
            link: linkAccessor ? await linkAccessor(item, this) : undefined,
            approvalState: isApproved ? ApprovalState.APPROVED : ApprovalState.UNAPPROVED
        }
    }


}

export default ItemModel