import { Router } from 'express'

import { Routes } from '../Constants'

const router = Router()

/**
 * Controller for API.
 * @param {IModel} model Model for ApiRouter.
 */
export default (model: IUniverseModel): Router => {

    /**
     * Route for get all bodies.
     */
    router.get(Routes.BODIES, (request, response) => {
        response.send(model.getBodies())
    })

    return router

}