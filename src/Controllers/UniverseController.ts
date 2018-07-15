import { Router } from 'express'
import { OK } from 'http-status-codes'

import {
    RequestHeaders,
    Routes,
} from '../Constants'

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
 * @param model Model for ApiRouter.
 */
export default (model: IUniverseModel): Router => {

    /**
     * Route for add new body.
     */
    router.post(ADD_BODY.PATH, (request, response) => {
        model.addBody(
            request.body,
            request.header(RequestHeaders.TOKEN)
        ).then(body => {
            response.status(OK).send(body)
        }).catch(error => {
            response.status(error).send()
        })
    })

    /**
     * Route for get all bodies.
     */
    router.get(GET_BODIES.PATH, (request, response) => {
        model.getBodies(
            request.header(RequestHeaders.TOKEN)
        ).then(bodies => {
            response.status(OK).send({ bodies })
        }).catch(error => {
            response.status(error).send()
        })
    })

    /**
     * Route for get body by ID.
     */
    router.get(GET_BODY_BY_ID.PATH, (request, response) => {
        model.getBodyById(
            request.params.bodyId,
            request.header(RequestHeaders.TOKEN)
        ).then(body => {
            response.status(OK).send({ body })
        }).catch(error => {
            response.status(error).send()
        })
    })

    /**
     * Route for remove body by ID.
     */
    router.delete(REMOVE_BODY_BY_ID.PATH, (request, response) => {
        model.removeBodyById(
            request.params.bodyId,
            request.header(RequestHeaders.TOKEN)
        ).then(count => {
            response.status(OK).send()
        }).catch(error => {
            response.status(error).send()
        })
    })

    /**
     * Route for update body by ID.
     */
    router.post(UPDATE_BODY.PATH, (request, response) => {
        model.updateBody(
            request.body.body,
            request.header(RequestHeaders.TOKEN)
        ).then(() => {
            response.status(OK).send()
        }).catch(error => {
            response.status(error).send()
        })
    })

    return router

}