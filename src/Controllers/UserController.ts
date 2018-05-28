import { Router } from 'express'

import { Routes } from '../Constants'

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
 * @param {IModel} model Model for ApiRouter.
 */
export default (model: IUserModel): Router => {

    /**
     * Route for add new user.
     */
    router.put(ADD_USER.PATH, (request, response) => {
        // TODO
    })

    /**
     * Route for get online users.
     */
    router.get(GET_ONLINE_USERS.PATH, (request, response) => {
        // TODO
    })

    /**
     * Route for get user by ID.
     */
    router.get(GET_USER_BY_ID.PATH, (request, response) => {
        // TODO
    })

    /**
     * Route for get all users.
     */
    router.get(GET_USERS.PATH, (request, response) => {
        // TODO
    })

    /**
     * Route for log in user.
     */
    router.post(LOG_IN_USER.PATH, (request, response) => {
        // TODO
    })

    /**
     * Route for remove user by ID.
     */
    router.delete(REMOVE_USER_BY_ID.PATH, (request, response) => {
        // TODO
    })

    /**
     * Route for update user.
     */
    router.post(UPDATE_USER.PATH, (request, response) => {
        // TODO
    })

    return router

}