import { Schema } from 'mongoose'

const NotificationSchema = new Schema({

    text: {
        type: String,
        required: true
    },

    target: {
        type: String
    },

    operation: {
        type: Number,
        required: true
    },

    subject: {
        type: Number,
        required: true
    },

    date: {
        type: String,
        required: true,
        default: () => new Date().toISOString()
    },

    __v: {
        type: Number,
        select: false
    }

})

export default NotificationSchema