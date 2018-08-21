import { OK, NO_CONTENT } from 'http-status-codes'
import BodyModel from '../Models/BodyModel'

type IAction = IFunction<any, Promise<any>>
type IResultMap = boolean | IFunction<any, any>

const defaultResultMap = result => result

enum Permission {

}

/**
 * Utils for express route.
 */
class Route {

    private constructor() {

    }

    private static process(action: IAction, resultMap: IResultMap = defaultResultMap): IRequestHandler {
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
    public static all(action: IAction, resultMap?: IResultMap): IRequestHandler {
        return this.process(action, resultMap)
    }

    /**
     * Run route handler only if author of user has this ID.
     * @param userId Required user's ID.
     * @param action Request action.
     * @param resultMap Convert model result to response data.
     */
    public static onlyWithId(userId: string, action: IAction, resultMap?: IResultMap): IRequestHandler {
        return null
    }

    /**
     * Run route handler only if author of request has this permission.
     * @param permission Required user's permission.
     * @param action Request action.
     * @param resultMap Convert model result to response data.
     */
    public static onlyWithPermission(permission: Permission, action: IAction, resultMap?: IResultMap): IRequestHandler {
        return null
    }

    /**
     * Run route handler only if author of request has this ID or permission.
     * @param userId Required user' s ID.
     * @param permission Required user's permission.
     * @param action Request action.
     * @param resultMap Convert model result to response data.
     */
    public static staticOnlyWithIdOrPermission(userId: string, permission: Permission, action: IAction, resultMap?: IResultMap): IRequestHandler {
        return null
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
                BodyModel.get(params.bodyId)
            )),
            put: Route.all(({ params, body }) => (
                BodyModel.update(params.bodyId, body)
            )),
            delete: Route.all(({ params }) => (
                BodyModel.remove(params.bodyId)
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