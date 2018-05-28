import {
    OperationType,
    UserRole
} from '../Constants'

/**
 * Acl for users.
 * Anything that is not allowed is forbidden.
 */
class Acl {

    /**
     * Check if operation is permitted by the user.
     * @param operation Operation.
     * @param user Current user.
     * @returns Operation is permitted.
     */
    public static isPermitted(operation: OperationType, user: IUser | IShortUser | IUnauthUser | IUserIdentity): boolean {
        switch (operation) {

            case OperationType.LOG_IN_USER:
                return !user.roles.includes(UserRole.LOGGED_IN)

            case OperationType.GET_USERS:
                return user.roles.includes(UserRole.LOGGED_IN)

            case OperationType.GET_ONLINE_USERS:
                return user.roles.includes(UserRole.LOGGED_IN)

            case OperationType.GET_USER_BY_ID:
                return user.roles.includes(UserRole.LOGGED_IN)

            case OperationType.ADD_USER:
                return user.roles.includes(UserRole.EVERYBODY)

            case OperationType.UPDATE_USER:
                // TODO: Add owner role.
                return user.roles.includes(UserRole.ADMIN)

            case OperationType.REMOVE_USER_BY_ID:
                // TODO: Add owner role.
                return user.roles.includes(UserRole.ADMIN)

            case OperationType.GET_UNAUTH_USER_BY_EMAIL:
                return !user.roles.includes(UserRole.LOGGED_IN)

            default:
                return false

        }
    }
}

export default Acl