Model.db = new Database({
    userName: Config.database.username,
    password: Config.database.password,
    cluster: Config.database.cluster,
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
