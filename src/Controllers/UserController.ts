import { Router } from 'express'
import { OK } from 'http-status-codes'

import {
    RequestHeaders,
    Routes
} from '../Constants'

const {
    ADD_USER,
    GET_ONLINE_USERS,
    GET_USER_BY_ID,
    GET_USERS,
    LOG_IN_USER,
    REMOVE_USER_BY_ID,
    UPDATE_USER
} = Routes.API.USER

const router = Router()

/**
 * Controller for API.
 * @param model Model for ApiRouter.
 */
export default (model: IUserModel): Router => {

    /**
     * Route for add new user.
     */
    router.put(ADD_USER.PATH, (request, response) => {
        model.addUser(
            request.body.user,
            request.header(RequestHeaders.TOKEN)
        ).then(() => {
            response.status(OK).send()
        }).catch(error => {
            response.status(error).send()
        })
    })

    /**
     * Route for get online users.
     */
    router.get(GET_ONLINE_USERS.PATH, (request, response) => {
        model.getOnlineUsers(
            request.header(RequestHeaders.TOKEN)
        ).then(users => {
            response.status(OK).send({ users })
        }).catch(error => {
            response.status(error).send()
        })
    })

    /**
     * Route for get user by ID.
     */
    router.get(GET_USER_BY_ID.PATH, (request, response) => {
        model.getUserById(
            request.params.userId,
            request.header(RequestHeaders.TOKEN)
        ).then(user => {
            response.status(OK).send({ user })
        }).catch(error => {
            response.status(error).send()
        })
    })

    /**
     * Route for get all users.
     */
    router.get(GET_USERS.PATH, (request, response) => {
        model.getUsers(
            request.header(RequestHeaders.TOKEN)
        ).then(users => {
            response.status(OK).send({ users })
        }).catch(error => {
            response.status(error).send()
        })
    })

    /**
     * Route for log in user.
     */
    router.post(LOG_IN_USER.PATH, (request, response) => {
        model.logInUser(
            request.body.email,
            request.body.password
        ).then(users => {
            response.status(OK).send({ users })
        }).catch(error => {
            response.status(error).send()
        })
    })

    /**
     * Route for remove user by ID.
     */
    router.delete(REMOVE_USER_BY_ID.PATH, (request, response) => {
        model.removeUserById(
            request.params.userId,
            request.header(RequestHeaders.TOKEN)
        ).then(count => {
            response.status(OK).send({ count })
        }).catch(error => {
            response.status(error).send()
        })
    })

    /**
     * Route for update user.
     */
    router.post(UPDATE_USER.PATH, (request, response) => {
        model.updateUser(
            request.body.user,
            request.header(RequestHeaders.TOKEN)
        ).then(users => {
            response.status(OK).send()
        }).catch(error => {
            response.status(error).send()
        })
    })

    return router

}