import { Router } from 'express'
import { OK } from 'http-status-codes'

import {
    RequestHeaders,
    Routes
} from '../Constants'

const {
    ADD_USER,
    GET_USERS,
    GET_UNAUTH_USER_BY_EMAIL
} = Routes.API.USER

const router = Router()

/**
 * Controller for API.
 * @param model Model for ApiRouter.
 */
export default (model: IUserModel): Router => {

    /**
     * Get unauth user by email.
     */
    router.get(GET_UNAUTH_USER_BY_EMAIL.PATH, (request, response) => {
        model.getUnauthUserByEmail(request.params.email)
            .then(user => response.status(OK).send({ user }))
            .catch(error => response.status(error).send())
    })

    /**
     * Route for add new user.
     */
    router.post(ADD_USER.PATH, (request, response) => {
        model
            .addUser(request.body.email, request.body.password)
            .then(() => response.status(OK).send())
            .catch(error => response.status(error).send())
    })

    /**
     * Route for get all users.
     */
    router.get(GET_USERS.PATH, (request, response) => {
        model
            .getUsers(request.header(RequestHeaders.TOKEN))
            .then(users => response.status(OK).send(users))
            .catch(error => response.status(error).send())
    })

    return router

}