import { Schema } from 'mongoose'

import Strings from '../../Utils/Strings'
import HashPlugin from '../Plugins/HashPlugin'
import ModifyPlugin from '../Plugins/ModifyPlugin'

/**
 * DB schema for user.
 */
const UserSchema = new Schema({

    email: {
        type: String,
        required: [true, 'Email is required.'],
        unique: true,
        validate: {
            validator: Strings.isEmail,
            message: 'Email must be in name@domain form.'
        }
    },

    password: {
        type: String,
        required: [true, 'Password hash is required.'], // TODO: Remove messages?
        select: false
    },

    name: {
        type: String
    },

    avatar: {
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
        },
        karma: {
            type: Number,
            required: true,
            default: 0
        }
    },

    __v: {
        type: Number,
        select: false
    }

})

UserSchema.plugin(HashPlugin, { field: 'password' })

UserSchema.plugin(ModifyPlugin, {
    field: 'name', function: user => Strings.capitalize(Strings.getPrefix(user.email, '@'))
})

export default UserSchema