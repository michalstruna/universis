import { DatabaseModels } from '../Constants'
import EntityModel from './EntityModel'

export default new EntityModel<IUser, IBaseUser, INewUser>({
    dbModel: DatabaseModels.USER
})