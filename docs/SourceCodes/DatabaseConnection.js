Model.db = new Database({
    prefix: Config.database.prefix,
    username: Config.database.username,
    password: Config.database.password,
    host: Config.database.host,
    database: Config.database.name,
    onError: console.error,
    schemas: {
        [DatabaseModels.BODY]: BodySchema,
        [DatabaseModels.BODY_EVENT]: BodyEventSchema,
        [DatabaseModels.BODY_TYPE]: BodyTypeSchema,
        [DatabaseModels.TOKEN]: TokenSchema,
        [DatabaseModels.USER]: UserSchema,
        ...
    }
})
