import { INTERNAL_SERVER_ERROR, NOT_ACCEPTABLE, NOT_FOUND, UNAUTHORIZED } from 'http-status-codes'

import Strings from '../Utils/Strings'
import Secret from '../Utils/Secret'
import Model from './Model'
import { UserRole } from '../Constants'

/**
 * Model for user.
 */
class UserModel extends Model implements IUserModel {

    /**
     * Database model for users.
     */
    private model: IDatabaseModel

    public constructor() {
        super()
        this.model = this.db.getModel(this.dbModels.USER)
    }

    public addUser(email: string, password: string): Promise<void> {
        return new Promise((resolve, reject) => {
            Secret.hash(password).then(hash => {
                password = hash

                this.model
                    .add({ email, password })
                    .then(() => resolve())
                    .catch(error => reject(INTERNAL_SERVER_ERROR))

            })
        })
    }

    public getOnlineUsers(token: string): Promise<IBaseUser[]> {
        return undefined
    }

    public getUserById(userId: string, token: string): Promise<IUser> { // TODO: Token authorization.
        return new Promise((resolve, reject) => {
            this.model
                .getById(userId)
                .run<IUser>()
                .then(user => resolve(user))
                .catch(error => reject(INTERNAL_SERVER_ERROR))
        })
    }

    public getUsers(token: string): Promise<IBaseUser[]> {
        return new Promise((resolve, reject) => {
            this.model
                .get({})
                .run<IBaseUser[]>()
                .then(users => resolve(users))
                .catch(error => reject(INTERNAL_SERVER_ERROR))
        })
    }

    public logInUser(email: string, password: string): Promise<IUserIdentity> {
        return new Promise((resolve, reject) => {
            this.model
                .getOne({ email })
                .run<any>() // TODO
                .then(user => {
                    if (user) {
                        Secret.compare(password, user.password).then(isCorrect => {
                            isCorrect ? resolve(user) : reject(UNAUTHORIZED)
                        })
                    } else {
                        reject(NOT_FOUND)
                    }
                })
                .catch(error => reject(INTERNAL_SERVER_ERROR))
        })
    }

    public removeUserById(userId: string): Promise<IUser> {
        return new Promise((resolve, reject) => {
            this.model
                .removeById<IUser>(userId)
                .then(user => resolve(user))
                .catch(error => reject(INTERNAL_SERVER_ERROR))
        })
    }

    public updateUser(user: IUser): Promise<void> {
        return undefined
    }

    public getUnauthUserByEmail(email: string): Promise<IBaseUser> {
        return new Promise((resolve, reject) => {
            if (Strings.isEmail(email)) {
                this.model
                    .getOne({ email })
                    .run<IBaseUser>()
                    .then(user => resolve(user ? user : UserModel.getNewUser(email)))
                    .catch(error => reject(INTERNAL_SERVER_ERROR))
            } else {
                reject(NOT_ACCEPTABLE)
            }
        })
    }

    /**
     * Get data for new user by his email.
     * @param email Email of user.
     * @returns {IBaseUser}
     */
    private static getNewUser(email: string): IBaseUser {
        return ({
            email,
            avatar: 'http://i372.photobucket.com/albums/oo170/Emperortopaz/Headshots/Esdeath_zpsz4aexby6.jpg', // TODO: Default avatar.
            roles: [UserRole.EVERYBODY],
            name: email
        })
    }

}

export default UserModel