/**
 * Interface for unauth user.
 * It contains only Public data about user.
 */
declare interface IUnauthUser extends IBaseUser {

    /**
     * First name of user.
     */
    firstName: string

    /**
     * User already exists or this is new user?
     */
    isSignedUp: boolean

}