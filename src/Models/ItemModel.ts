import { Errors, NotificationRelations } from '../Constants'
import Model from './Model'
//import NotificationModel from './NotificationModel' // TODO: Fix circular dependency.

class ItemModel<Full extends Universis.Item, Simple extends Universis.Item, New extends Universis.Item> extends Model implements Universis.Item.Model<Full, Simple, New> {

    private options: Universis.Model.Options<Full, Simple, New>

    public constructor(options: Universis.Model.Options<Full, Simple, New>) {
        super()

        this.options = {
            add: {},
            addOne: {},
            get: {},
            getOne: {},
            remove: {},
            removeOne: {},
            update: {},
            updateOne: {},
            ...options
        }

        this.dbModel = this.db.getModel(options.dbModel)
    }

    public async add(items: New[]): Promise<string[]> {
        const { add, addOne, notifications } = this.options

        if (add.onBefore) {
            await add.onBefore(items)
        } else if (addOne.onBefore) {
            await Promise.all(items.map(item => addOne.onBefore(item)))
        }

        const addedItems = await this.dbModel.add<Full>(items)

        if (notifications && add.notification) {
            /*await NotificationModel.add(addedItems.map(item => ({
                relation: NotificationRelations.ADD,
                subject: notifications.subjectType,
                text: notifications.textAccessor(item),
                target: notifications.targetAccessor ? notifications.targetAccessor(item) : null
            })))*/
        }

        if (add.onAfter) {
            await add.onAfter(addedItems, items)
        } else if (addOne.onAfter) {
            await Promise.all(items.map((item, i) => addOne.onAfter(addedItems[i], item)))
        }

        return addedItems.map(item => item._id)
    }

    public async addOne(item: New): Promise<string> {
        const { addOne, notifications } = this.options

        if (addOne.onBefore) {
            await addOne.onBefore(item)
        }

        const addedItem = await this.dbModel.addOne<Full>(item)

        if (notifications && addOne.notification) {
            /*await NotificationModel.addOne({
                relation: NotificationRelations.ADD,
                subject: notifications.subjectType,
                text: notifications.textAccessor(addedItem),
                target: notifications.targetAccessor ? notifications.targetAccessor(addedItem) : null
            })*/
        }

        if (addOne.onAfter) {
            await addOne.onAfter(addedItem, item)
        }

        return addedItem._id
    }

    public approve(filter: Universis.Database.Query.Filter, options?: Universis.Database.Query.Options): Promise<number> {
        return undefined
    }

    public approveOne(filter: Universis.Database.Query.Filter, options?: Universis.Database.Query.OptionsForOne): Promise<void> {
        return undefined
    }

    public async count(filter: Universis.Database.Query.Filter): Promise<number> {
        return undefined
    }

    public async get(filter: Universis.Database.Query.Filter, options?: Universis.Database.Query.Options): Promise<Simple[]> {
        return undefined
    }

    public async getOne(filter: Universis.Database.Query.Filter, options?: Universis.Database.Query.OptionsForOne): Promise<Full> {
        return undefined
    }

    public async remove(filter: Universis.Database.Query.Filter, options?: Universis.Database.Query.Options): Promise<number> {
        return undefined
    }

    public async removeOne(filter: Universis.Database.Query.Filter, options?: Universis.Database.Query.OptionsForOne): Promise<void> {
        return undefined
    }

    public async update(filter: Universis.Database.Query.Filter, changes: New, options?: Universis.Database.Query.Options): Promise<number> {
        return undefined
    }

    public async updateOne(filter: Universis.Database.Query.Filter, changes: New, options?: Universis.Database.Query.OptionsForOne): Promise<void> {
        return undefined
    }

}

export default ItemModel