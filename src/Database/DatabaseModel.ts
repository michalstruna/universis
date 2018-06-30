import { Model, Document } from 'mongoose'

/**
 * Adapter for database model.
 */
class DatabaseModel implements IDatabaseModel {

    /**
     * Original mongoose model.
     */
    private model: Model<Document>

    public constructor(model: Model<Document>) {
        this.model = model
    }

    add(data: Object): Promise<Document> {
        return new this.model(data).save()
    }

    find(condition: Object): Promise<Document[]> {
        return this.model.find(condition).exec()
    }

    findById(id: string): Promise<Document | null> {
        return this.model.findById(id).exec()
    }

    findOne(condition: Object): Promise<Document | null> {
        return this.model.findOne(condition).exec()
    }

    remove(condition: Object): Promise<Document[]> {
        return this.model.remove(condition).exec()
    }

    removeById(id: string): Promise<Document | null> {
        return this.model.findByIdAndRemove(id).exec()
    }

    removeOne(condition: Object): Promise<Document | null> {
        return this.model.findOneAndRemove(condition).exec()
    }

    update(condition: Object, newValues: Object): Promise<Document[]> {
        return this.model.updateMany(condition, newValues).exec()
    }

    updateById(id: string, newValues: Object): Promise<Document | null> {
        return this.model.findByIdAndUpdate(id, newValues).exec()
    }

    updateOne(condition: Object, newValues: Object): Promise<Document | null> {
        return this.model.updateOne(condition, newValues).exec()
    }

}

export default DatabaseModel