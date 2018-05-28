/**
 * Interface for all base data about user.
 */
declare interface IBaseUser {

    /**
     * User's ID.
     */
    id: string

    /**
     * User's email.
     */
    email: string

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
 * Interface for user.
 * It contains all data about user.
 */
declare interface IUser extends IBaseUser {

}

/**
 * Interface for short user.
 * It contains only necessary data about user.
 */
declare interface IShortUser extends IBaseUser {

}

/**
 * Interface for unauth user.
 * It contains only public data about user.
 */
declare interface IUnauthUser extends IBaseUser {

}

/**
 * interface for user identity.
 * This is only for owner user.
 * Nobody else shouldn't know user's token.
 */
declare interface IUserIdentity extends IShortUser {

    /**
     * Temporally access token of user.
     */
    token: string

}