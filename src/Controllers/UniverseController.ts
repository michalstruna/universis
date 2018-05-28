import { Router } from 'express'

import { Routes } from '../Constants'

const {
    ADD_BODY,
    GET_BODIES,
    GET_BODY_BY_ID,
    REMOVE_BODY_BY_ID,
    UPDATE_BODY
} = Routes.API.UNIVERSE

const router = Router()

/**
 * Controller for API.
 * @param {IModel} model Model for ApiRouter.
 */
export default (model: IUniverseModel): Router => {

    /**
     * Route for add new body.
     */
    router.put(ADD_BODY.PATH, (request, response) => {
        // TODO
    })

    /**
     * Route for get all bodies.
     */
    router.get(GET_BODIES.PATH, (request, response) => {
        // TODO
    })

    /**
     * Route for get body by ID.
     */
    router.get(GET_BODY_BY_ID.PATH, (request, response) => {
        // TODO
    })

    /**
     * Route for remove body by ID.
     */
    router.delete(REMOVE_BODY_BY_ID.PATH, (request, response) => {
        // TODO
    })

    /**
     * Route for update body by ID.
     */
    router.post(UPDATE_BODY.PATH, (request, response) => {
        // TODO
    })

    return router

}