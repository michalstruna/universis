/**
 * Plugin to modify field of schema with custom function before insert to DB.
 * @param schema Schema.
 * @param options Options { field: string, function: Universis.Consumer<Document>, update?: Boolean }.
 */
const ModifyPlugin = (schema, options) => {

    schema.pre('save', async function () {
        this[options.field] = options.function(this)
    })

}

export default ModifyPlugin