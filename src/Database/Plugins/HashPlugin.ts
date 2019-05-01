import Security from '../../Utils/Security'

/**
 * Plugin that hash field of schema before insert to DB.
 * @param schema Schema.
 * @param options Options. There must be name of field, that will be converted to a hash.
 */
const HashPlugin = (schema, options) => {

    schema.pre('save', async function () {
        if (this[options.field]) {
            this[options.field] = await Security.hash(this[options.field])
        }
    })

    schema.pre('findOneAndUpdate', async function () {
        if (this._update[options.field]) {
            this._update[options.field] = await Security.hash(this._update[options.field])
        }
    })

    schema.pre('update', async function () {
        if (this._update[options.field]) {
            this._update[options.field] = await Security.hash(this._update[options.field])
        }
    })

}

export default HashPlugin

// TODO: Refactor Plugins utils.