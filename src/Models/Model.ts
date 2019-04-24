import Config from '../Constants/Config'

import { DatabaseModels } from '../Constants'
import Database from '../Database/Database'

import BodySchema from '../Database/Schemas/BodySchema'
import BodyTypeSchema from '../Database/Schemas/BodyTypeSchema'
import UserSchema from '../Database/Schemas/UserSchema'
import TokenSchema from '../Database/Schemas/TokenSchema'
import NotificationSchema from '../Database/Schemas/NotificationSchema'
import BodyEventSchema from '../Database/Schemas/BodyEventSchema'
import BodyPostSchema from '../Database/Schemas/BodyPostSchema'
import PostVoteSchema from '../Database/Schemas/PostVoteSchema'
import MessageSchema from '../Database/Schemas/MessageSchema'
import UnapprovedSchema from '../Database/Schemas/UnapprovedSchema'

/**
 * Base model. This is parent of each another model.
 */
abstract class Model {

    /**
     * Cached instance of database
     */
    protected static db: Universis.Database

    /**
     * Instance of database
     */
    protected db: Universis.Database

    /**
     * Primary database model.
     */
    protected dbModel: Universis.Database.Model

    public constructor() {
        if (!Model.db) {
            Model.createBaseDatabase()
        }

        this.db = Model.db
    }

    /**
     * Create connection to DB.
     * Only if connection is not already exists.
     */
    private static createBaseDatabase(): void {
        Model.db = new Database({
            prefix: Config.database.prefix,
            username: Config.database.username,
            password: Config.database.password,
            host: Config.database.host,
            database: Config.database.name,
            options: Config.database.options,
            onError: console.error,
            schemas: {
                [DatabaseModels.BODY]: BodySchema,
                [DatabaseModels.BODY_TYPE]: BodyTypeSchema,
                [DatabaseModels.USER]: UserSchema,
                [DatabaseModels.TOKEN]: TokenSchema,
                [DatabaseModels.NOTIFICATION]: NotificationSchema,
                [DatabaseModels.BODY_EVENT]: BodyEventSchema,
                [DatabaseModels.BODY_POST]: BodyPostSchema,
                [DatabaseModels.POST_VOTE]: PostVoteSchema,
                [DatabaseModels.MESSAGE]: MessageSchema,
                [DatabaseModels.UNAPPROVED]: UnapprovedSchema
            }
        })
    }

}

export default Model