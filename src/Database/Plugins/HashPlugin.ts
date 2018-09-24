import Security from '../../Utils/Security'

/**
 * Plugin that hash field of schema before insert to DB.
 * @param schema Schema.
 * @param options Options. There must be name of field, that will be converted to a hash.
 */
const HashPlugin = (schema, options) => {

    schema.pre('save', async function () {
        this[options.field] = await Security.hash(this[options.field])
    })

    schema.pre('findOneAndUpdate', async function () {
        this._update[options.field] = await Security.hash(this._update[options.field])
    })

    schema.pre('update', async function () {
        this._update[options.field] = await Security.hash(this._update[options.field])
    })

}

export default HashPlugin