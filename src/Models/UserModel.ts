import { DatabaseModels } from '../Constants'
import ItemModel from './ItemModel'

export default new ItemModel<IUser, IBaseUser, INewUser>({
    dbModel: DatabaseModels.USER
})