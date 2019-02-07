import { Schema } from 'mongoose'

export default new Schema({

    modelName: {
        type: String,
        required: true
    },

    type: {
        type: Number,
        required: true
    },

    data: {
        type: Schema.Types.Mixed,
        required: false
    },

    date: {
        type: String,
        required: true,
        default: () => new Date().toISOString()
    }

})