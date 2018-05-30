import { Router } from 'express'

import UniverseModel from '../Models/UniverseModel'
import UniverseController from './UniverseController'

import UserModel from '../Models/UserModel'
import UserController from './UserController'

import { Routes } from '../Constants'

/**
 * Controller for API.
 * @param model Model for ApiController.
 */
export default (model: IApiModel): Router => {

    const router = Router()

    router.use(Routes.API.UNIVERSE.PATH, UniverseController(new UniverseModel()))
    router.use(Routes.API.USER.PATH, UserController(new UserModel()))

    return router

}