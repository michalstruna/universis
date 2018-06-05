import { NOT_ACCEPTABLE } from 'http-status-codes'

import Strings from '../Utils/Strings'

/**
 * Model for user.
 */
class UserModel implements IUserModel {

    public addUser(user: IUser, token: string): Promise<void> {
        return undefined
    }

    public getOnlineUsers(token: string): Promise<IShortUser[]> {
        return undefined
    }

    public getUserById(userId: string, token: string): Promise<IUser> {
        return undefined
    }

    public getUsers(token: string): Promise<IShortUser[]> {
        return undefined
    }

    public logInUser(email: string, password: string): Promise<IUserIdentity> {
        return undefined
    }

    public removeUserById(userId: string, token: string): Promise<number> {
        return undefined
    }

    public updateUser(user: IUser, token: string): Promise<void> {
        return undefined
    }

    public getUnauthUserByEmail(email: string): Promise<IUnauthUser> {
        return new Promise((resolve, reject) => {
            if (Strings.isEmail(email)) {
                if (email === 'michal.l.struna@gmail.com') { // TODO: From DB.
                    resolve({
                        _id: 'iduser',
                        email: email,
                        avatar: 'avatarurl',
                        roles: [1, 2]
                    })
                } else {
                    resolve(null) // TODO: Return anonymous new user.
                }
            } else {
                reject(NOT_ACCEPTABLE)
            }
        })
    }

}

export default UserModel