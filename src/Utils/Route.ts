import { OK, NO_CONTENT } from 'http-status-codes'

const defaultResultMap = result => result
const defaultIsAuthorized = user => true

/**
 * Utils for express route.
 */
class Route {

    private constructor() {

    }

    private static process(action: IRouteAction, resultMap: IResultMap = defaultResultMap, isAuthorized: IIsAuthorized = defaultIsAuthorized): IRequestHandler {
        return (request, response) => (
            action(request)
                .then(result => {
                    if (typeof resultMap === 'boolean') {
                        response.sendStatus(NO_CONTENT)
                    } else {
                        response.status(OK).send(resultMap(typeof result === 'number' ? result.toString() : result))
                    }
                }).catch(error => response.sendStatus(error))
        )
    }

    /**
     * Run route handler in all cases.
     * @param action Request action.
     * @param resultMap Convert model result to response data.
     */
    public static all(action: IRouteAction, resultMap?: IResultMap): IRequestHandler {
        return this.process(action, resultMap)
    }

    /**
     * Run route handler only if author of user has this ID.
     * @param userId Required user's ID.
     * @param action Request action.
     * @param resultMap Convert model result to response data.
     */
    public static onlyWithId(userId: string, action: IRouteAction, resultMap?: IResultMap): IRequestHandler {
        return this.process(action, resultMap)
    }

    /**
     * Generate routes for all entities.
     * @param model Entity model.
     * @returns Route group.
     */
    public static getRouteGroupForAll(model: IEntityModel<any, any, any>): IRouteGroupForAll {
        return {
            get: Route.all(({ query }) => (
                model.getAll(
                    query.order,
                    query.criterion,
                    parseInt(query.limit),
                    parseInt(query.offset)
                )
            )),
            post: Route.all(({ body }) => (
                model.add(body)
            ), _id => ({ _id })),
            delete: Route.all(() => (
                model.removeAll()
            ), count => ({ count }))
        }
    }

    /**
     * Generate routes for one entity.
     * @param model Entity model.
     * @returns Route group.
     */
    public static getRouteGroupForOne(model: IEntityModel<any, any, any>): IRouteGroupForOne {
        return {
            get: Route.all(({ params }) => (
                model.get(params.bodyId)
            )),
            put: Route.all(({ params, body }) => (
                model.update(params.bodyId, body)
            )),
            delete: Route.all(({ params }) => (
                model.remove(params.bodyId, false)
            ))
        }
    }

    public static getRouteGroupForCount(model: IEntityModel<any, any, any>): IRouteGroupForCount {
        return {
            get: Route.all(() => model.getCount())
        }
    }

}

export default Route