/**
 * Interface for all base data about user.
 */
declare interface IBaseUser {

    /**
     * User's ID.
     */
    _id?: string

    /**
     * User's email.
     */
    email: string

    /**
     * Name of user. Default is email.
     */
    name: string

    /**
     * User's image's url.
     */
    avatar: string

    /**
     * Roles of user.
     */
    roles: {
        [index: number]: number,
        includes: (number) => boolean
    }

}

/**
 * Interface for new user.
 */
declare interface INewUser {

    /**
     * Email of user.
     */
    email: string

    /**
     * Password of user.
     */
    password: string

}

/**
 * Interface for user.
 * It contains all data about user.
 */
declare interface IUser extends IBaseUser {

}

/**
 * interface for user identity.
 * This is only for owner user.
 * Nobody else shouldn't know user's token.
 */
declare interface IUserIdentity extends IBaseUser {

    /**
     * Temporally access token of user.
     */
    token: string

}