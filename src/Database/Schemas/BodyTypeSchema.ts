import { Schema } from 'mongoose'

/**
 * DB schema for body type.
 */
const BodyTypeSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
})

export default BodyTypeSchema