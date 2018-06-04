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
        return undefined
    }

}

export default UserModel