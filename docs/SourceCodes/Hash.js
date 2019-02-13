// UserSchema.ts
UserSchema.plugin(HashPlugin, { field: 'password' })

// HashPlugin.ts
const HashPlugin = Plugins.onChange(async (doc, options) => {
    doc[options.field] = await Security.hash(doc[options.field])
}, options.field)
