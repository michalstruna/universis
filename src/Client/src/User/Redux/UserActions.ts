import { Api } from '../../Utils'
import ACTION_TYPES from './ActionTypes'

/**
 * Actions for users.
 */
class UserActions {

    /**
     * Get unauth user by email.
     * @param email Email of user.
     */
    public static getUnauthUserByEmail = (email: string) => (
        dispatch => {
            dispatch({ type: ACTION_TYPES.GET_UNAUTH_IDENTITY_SENT })

            return Api.getUnauthUser(email).then(user => {
                dispatch({ type: ACTION_TYPES.GET_UNAUTH_IDENTITY_SUCCESS, user })
            }).catch(error => {
                dispatch({ type: ACTION_TYPES.GET_UNAUTH_IDENTITY_FAIL, error })
            })
        }
    )

}

export default UserActions