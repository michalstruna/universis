class UserModel implements IUserModel {

    addUser(user: IUser, token: string): Promise<void> {
        return undefined
    }

    getFriends(userId: string, token: string): Promise<IShortUser[]> {
        return undefined
    }

    getOnlineUsers(token: string): Promise<IShortUser[]> {
        return undefined
    }

    getUserById(userId: string, token: string): Promise<IUser> {
        return undefined
    }

    getUsers(token: string): Promise<IShortUser[]> {
        return undefined
    }

    logInUser(email: string, password: string): Promise<IUser> {
        return undefined
    }

    removeUserById(userId: string, token: string): Promise<number> {
        return undefined
    }

    updateUser(user: IUser, token: string): Promise<void> {
        return undefined
    }

}

export default UserModel