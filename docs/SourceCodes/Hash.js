// UserSchema.ts
UserSchema.plugin(HashPlugin, { field: 'password' })

// HashPlugin.ts
const HashPlugin = (schema, options) => {
    schema.pre('save', async function () {
        this[options.field] = await Security.hash(this[options.field])
    })
}
