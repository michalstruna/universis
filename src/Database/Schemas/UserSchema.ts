import { Schema } from 'mongoose'

import Strings from '../../Utils/Strings'
import HashPlugin from '../Plugins/HashPlugin'
import { UserRole } from '../../Constants'

/**
 * DB schema for users.
 * There should be { select: false } in option for password field.
 * Name by user is by default part of email before '@' char. // TODO: Duplicate names?
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
            return Strings.capitalize(Strings.getPrefix(this.email, '@'))
        }
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
        },
        karma: {
            type: Number,
            required: true,
            default: 0
        }
    },

    avatar: {
        type: String
    },

    birth: {
        type: String
    },

    isFemale: {
        type: Boolean
    },

    profileText: {
        type: String
    },

    publicEmail: {
        type: String
    },

    website: {
        type: String
    },

    role: {
        type: Number,
        default: UserRole.AUTHENTICATED
    },

    lastOnline: {
        type: String,
        default: () => new Date().getTime()
    },

    __v: {
        type: Number,
        select: false
    }

}, { timestamps: true })

UserSchema.plugin(HashPlugin, { field: 'password' })

export default UserSchema