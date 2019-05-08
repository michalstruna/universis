Model.db = new Database({
    prefix: Config.database.prefix,
    username: Config.database.username,
    password: Config.database.password,
    host: Config.database.host,
    database: Config.database.name,
    onError: console.error,
    schemas: {
        [DatabaseModel.BODY]: BodySchema,
        [DatabaseModel.BODY_EVENT]: BodyEventSchema,
        [DatabaseModel.BODY_TYPE]: BodyTypeSchema
    }
})
