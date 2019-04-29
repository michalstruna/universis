import { DatabaseModel } from '../Constants'
import ItemModel from './ItemModel'

export default new ItemModel<Universis.User, Universis.User.Simple, Universis.User.New>({
    dbModel: DatabaseModel.USER,
    get: {
        custom: filter => ([
            { $match: filter },
            { $lookup: { from: 'postvotes', localField: '_id', foreignField: 'userId', as: 'inVotes' } }
        ])
    }
})