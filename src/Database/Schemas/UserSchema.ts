import { Schema } from 'mongoose'

import Strings from '../../Utils/Strings'
import HashPlugin from '../Plugins/HashPlugin'
import { UserRole } from '../../Constants'

/**
 * DB schema for users.
 * There should be { select: false } in option for password field.
 */
const UserSchema = new Schema({

    email: {
        type: String,
        required: true,
        unique: true,
        validate: { validator: Strings.isEmail }
    },

    password: {
        type: String,
        required: true,
        select: false
    },

    name: {
        type: String,
        unique: true,
        required: true,
        default: function () {
            return Strings.capitalize(this.email.replace('@', ''))
        }
    },

    home: {
        type: String
    },

    score: {
        gold: {
            type: Number,
            required: true,
            default: 0
        },
        silver: {
            type: Number,
            required: true,
            default: 0
        },
        bronze: {
            type: Number,
            required: true,
            default: 0
        }
    },

    avatar: {
        type: String
    },

    born: {
        type: String
    },

    isFemale: {
        type: Boolean
    },

    about: {
        type: String
    },

    publicEmail: {
        type: String
    },

    facebook: {
        type: String
    },

    website: {
        type: String
    },

    role: {
        type: Number,
        default: UserRole.AUTHENTICATED
    },

    isOnline: {
        type: Boolean,
        default: false
    },

    lastOnline: {
        type: Number,
        default: () => new Date().getTime()
    },

    __v: {
        type: Number,
        select: false
    }

}, { timestamps: true })

UserSchema.plugin(HashPlugin, { field: 'password' })

export default UserSchema