import { Router } from 'express'

import UniverseModel from '../Models/UniverseModel'
import UniverseController from './UniverseController'

import { Routes } from '../Constants'

/**
 * Controller for API.
 * @param {IModel} model Model for ApiController.
 */
export default (model: IApiModel): Router => {

    const router = Router()

    router.use(Routes.UNIVERSE, UniverseController(new UniverseModel()))

    return router

}