import { Schema } from 'mongoose'

import Strings from '../../Utils/Strings'
import Secret from '../../Utils/Secret'

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
        type: String
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

UserSchema.pre<any>('save', async function () {
    this.password = await Secret.hash(this.password)
    this.name = Strings.capitalize(Strings.getPrefix(this.email, '@'))
})

export default UserSchema