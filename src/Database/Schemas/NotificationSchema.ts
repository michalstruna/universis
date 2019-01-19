import { Schema } from 'mongoose'

const NotificationSchema = new Schema({

    text: {
        type: String,
        required: true
    },

    target: {
        type: String,
        required: true
    },

    relation: {
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
    }

})

export default NotificationSchema