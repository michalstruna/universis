import { Schema } from 'mongoose'

import Strings from '../../Utils/Strings'
import UserRole from '../../Constants/UserRole'

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
        required: [true, 'Password hash is required.']
    },

    name: {
        type: String,
        required: [true, 'Name is required.'],
        unique: true,
        default: 'No Name' // TODO: Equals this.email.
    },

    roles: {
        type: [Number],
        required: [true, 'Roles are required.'],
        default: [UserRole.EVERYBODY]
    },

    avatar: {
        type: String,
        required: [true, 'Avatar is required.'],
        default: 'http://i372.photobucket.com/albums/oo170/Emperortopaz/Headshots/Esdeath_zpsz4aexby6.jpg' // TODO: Default avatar.
    },

    __v: {
        type: Number,
        select: false
    }

})

export default UserSchema