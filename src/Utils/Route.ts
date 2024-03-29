import { OK, NO_CONTENT, UNAUTHORIZED } from 'http-status-codes'

import SecurityModel from '../Models/SecurityModel'
import UserModel from '../Models/UserModel'
import { UserRole } from '../Constants'
import { request } from 'https'

const defaultResultMap = result => result
const defaultIsAuthorized = user => true

/**
 * Utils for express route.
 */
class Route {

    private constructor() {

    }

    /**
     * Everybody can getAll, add and deleteAll.
     */
    private static DEFAULT_ROUTE_GROUP_ACCESS_FOR_ALL = {
        get: Route.all,
        post: Route.all,
        delete: Route.onlyAdmin
    }

    /**
     * Everybody can getById, updateById and deleteById.
     */
    private static DEFAULT_ROUTE_GROUP_ACCESS_FOR_ONE = {
        get: Route.all,
        put: Route.all,
        delete: Route.all
    }

    /**
     * Everybody can getCount.
     */
    private static DEFAULT_ROUTE_GROUP_ACCESS_FOR_COUNT = {
        get: Route.all
    }

    /**
     * Process request and check authorization.
     * @param action
     * @param resultMap
     * @param isAuthorized
     */
    private static process(action: IRouteAction, resultMap: IResultMap = defaultResultMap, isAuthorized: IIsAuthorized = defaultIsAuthorized): IRequestHandler {
        return async (request, response) => {
            // TODO: Because of replace BodyParser by Formidable. Refactor?
            request.body = request.fields

            if (request.body.__stringData) {
                request.body = { ...request.body, ...JSON.parse(request.body.__stringData) }
                delete request.body.__stringData
            }

            let user

            const requestData = {
                ...request,
                ip: request.headers['x-forwarded-for'] || request.connection.remoteAddress
            }

            try {
                const token = request.headers['authorization'] || request.headers['access-token']

                if (token) {
                    const tokenData = await SecurityModel.verify(token.replace('Bearer ', ''))
                    user = await UserModel.get({ _id: tokenData.userId })
                    requestData.user = user
                    requestData.userId = user._id
                }
            } catch {
                // Error is OK. Token is just invalid, but for unauthorized routes it doesn't matter.
            }

            if (isAuthorized(requestData)) {
                return action(requestData)
                    .then(result => {
                        if (typeof resultMap === 'boolean') {
                            response.sendStatus(NO_CONTENT)
                        } else {
                            response.status(OK).send(resultMap(typeof result === 'number' ? result.toString() : result))
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        response.status(error.code).send(error)
                    })
            } else {
                response.status(UNAUTHORIZED).send()
            }
        }
    }

    /**
     * Run route handler in all cases.
     * @param action Request action.
     * @param resultMap Convert model result to response data.
     */
    public static all(action: IRouteAction, resultMap?: IResultMap): IRequestHandler {
        return Route.process(action, resultMap)
    }

    /**
     * Run route handler in authenticated cases.
     * @param action Request action.
     * @param resultMap Convert model result to response data.
     */
    public static onlyAuthenticated(action: IRouteAction, resultMap?: IResultMap): IRequestHandler {
        return Route.process(action, resultMap, ({ user }) => !!user)
    }

    /**
     * Run route handler in admin cases.
     * @param action Request action.
     * @param resultMap Convert model result to response data.
     */
    public static onlyAdmin(action: IRouteAction, resultMap?: IResultMap): IRequestHandler {
        return Route.process(action, resultMap, ({ user }) => user && user.role === UserRole.ADMIN)
    }

    /**
     * Run route handler by custom rule.
     * @param rule Custom function, that accept request in parameter and returns if user is authorized for the request.
     */
    public static custom(rule: Universis.Function<IExpressRequest, boolean>): IDefaultRouteAccess {
        return (action: IRouteAction, resultMap?: IResultMap) => Route.process(action, resultMap, rule)
    }

    private static getFilterFromQuery(query: any): any {
        const filter = {}
        const reservedQueries = ['sort', 'reverse', 'limit', 'offset']

        for (let name in query) {
            if (!reservedQueries.includes(name)) {
                filter[name] = query[name]
            }
        }

        return filter
    }

    /**
     * Generate routes for all entities.
     * @param model Entity model.
     * @param access Object of access points. It can be default function (Route.all, ...) or custom request handlers (Route.all(), ...).
     * @returns Route group.
     */

    public static getRouteGroupForAll(model: Universis.Model.Unspecified, access: IRouteGroupAccess = Route.DEFAULT_ROUTE_GROUP_ACCESS_FOR_ALL): IRouteGroupForAll {
        const routeGroup: Universis.Map<IRequestHandler> = {}

        // TODO: Map before and map after.
        if (access.get) {
            const handler = 'access' in access.get ? access.get.access : access.get
            const filter = 'filter' in access.get ? access.get.filter : () => []

            routeGroup.get = handler((request) => (
                model.getAll(
                    { ...Route.getFilterFromQuery(request.query), ...filter(request) },
                    {
                        sort: request.query.sort,
                        reverse: request.query.reverse,
                        limit: parseInt(request.query.limit),
                        offset: parseInt(request.query.offset)
                    }
                )))
        }

        if (access.post) {
            const mapBefore = 'mapBefore' in access.post ? access.post.mapBefore : request => request.body
            const mapAfter = 'mapAfter' in access.post ? access.post.mapAfter : item => item
            const handler = 'access' in access.post ? access.post.access : access.post
            routeGroup.post = handler(async request => model.add({
                    ...(await mapBefore(request)),
                    userId: request.userId,
                    ip: request.ip
                }),
                mapAfter
            )
        }

        if (access.delete && typeof access.delete !== 'object') {
            routeGroup.delete = access.delete(() => model.delete({}), count => ({ count }))
        }

        return routeGroup
    }

    /**
     * Generate routes for one entity.
     * @param model Entity model.
     * @param access Object of access points. It can be default function (Route.all, ...) or custom request handlers (Route.all(), ...).
     * @returns Route group.
     */
    public static getRouteGroupForOne(model: Universis.Model.Unspecified, access: IRouteGroupAccess = Route.DEFAULT_ROUTE_GROUP_ACCESS_FOR_ONE): IRouteGroupForOne {
        const routeGroup: Universis.Map<IRequestHandler> = {}

        if (access.get) {
            const handler = 'access' in access.get ? access.get.access : access.get
            routeGroup.get = handler(({ params }) => model.get({ _id: params[Object.keys(params)[0]] }))
        }

        if (access.put) {
            const mapBefore = 'mapBefore' in access.put ? access.put.mapBefore : request => request.body
            const mapAfter = 'mapAfter' in access.put ? access.put.mapAfter : false
            const handler = 'access' in access.put ? access.put.access : access.put
            routeGroup.put = handler(async request => model.update({ _id: request.params[Object.keys(request.params)[0]] }, {
                ...(await mapBefore(request)),
                userId: request.userId,
                ip: request.ip
            }), mapAfter)
        }

        if (access.delete && typeof access.delete !== 'object') {
            routeGroup.delete = access.delete(({ params, userId }) => model.delete({ _id: params[Object.keys(params)[0]], userId }), false)
        }

        return routeGroup
    }

    public static getRouteGroupForCount(model: Universis.Model.Unspecified, access: IRouteGroupAccess = Route.DEFAULT_ROUTE_GROUP_ACCESS_FOR_COUNT): IRouteGroupForCount {
        const routeGroup: Universis.Map<IRequestHandler> = {}

        if (access.get && typeof access.get !== 'object') {
            routeGroup.get = access.get(() => model.count({})) // TODO: Filter.
        }

        return routeGroup
    }

    public static getSwaggerRouteGroupForOne(tags: string[], schema: string, pathParameters: string[] = [], routes: string[] = ['get', 'put', 'delete'], security: string[] = []) {
        const result = { parameters: [], get: undefined, put: undefined, delete: undefined }

        result.parameters = pathParameters.map(parameter => ({
            'in': 'path',
            'name': parameter,
            'required': true,
            'schema': {
                '$ref': '#/components/schemas/Id'
            },
            'description': 'Path identificator.'
        }))

        if (routes.includes('get')) {
            result.get = {
                'tags': tags,
                'security': security.includes('get') ? [{ 'bearerAuth': [] }] : undefined,
                'summary': 'Get item by ID.',
                'description': 'Get item by ID.',
                'responses': {
                    '200': {
                        'description': 'Get item is successful.',
                        'content': {
                            'application/json': {
                                'schema': {
                                    '$ref': '#/components/schemas/' + schema
                                }
                            }
                        }
                    },
                    '401': {
                        'description': 'Unauthorized request.'
                    },
                    '404': {
                        'description': 'Item with ID was not found.'
                    }
                }
            }
        }

        if (routes.includes('put')) {
            result.put = {
                'tags': tags,
                'security': security.includes('put') ? [{ 'bearerAuth': [] }] : undefined,
                'summary': 'Update already existing item.',
                'description': 'Create new item and return ID of created item.',
                'requestBody': {
                    'content': {
                        'application/json': {
                            'schema': {
                                '$ref': '#/components/schemas/' + schema
                            }
                        }
                    }
                },
                'responses': {
                    '204': {
                        'description': 'Item was successfully updated.'
                    },
                    '400': {
                        'description': 'Invalid values.'
                    },
                    '401': {
                        'description': 'Unauthorized request.'
                    },
                    '404': {
                        'description': 'Item with ID was not found.'
                    },
                    '409': {
                        'description': 'Item with this unique value already exists.'
                    }
                }
            }
        }

        if (routes.includes('delete')) {
            result.delete = {
                'tags': tags,
                'security': security.includes('delete') ? [{ 'bearerAuth': [] }] : undefined,
                'summary': 'Delete item by ID.',
                'description': 'Delete item by ID.',
                'parameters': [],
                'responses': {
                    '204': {
                        'description': 'Item was successful deleted.'
                    },
                    '400': {
                        'description': 'Item cannot be deleted, because of existing dependencies.'
                    },
                    '401': {
                        'description': 'Unauthorized request.'
                    },
                    '404': {
                        'description': 'Item with ID was not found.'
                    }
                }
            }
        }

        return result
    }

    public static getSwaggerRouteGroupForCount(tags: string[], security: boolean = false) {
        return {
            'parameters': [
                {
                    'in': 'query',
                    'name': 'filter',
                    'schema': {
                        'type': 'object',
                        'additionalProperties': {
                            'type': 'string'
                        }
                    },
                    'description': 'Filter items by its any property.'
                }
            ],
            'get': {
                'tags': tags,
                'security': security ? [{ 'bearerAuth': [] }] : undefined,
                'summary': 'Get count of all items.',
                'description': 'Get count of all items.',
                'responses': {
                    '200': {
                        'description': 'Get items count is successful.',
                        'content': {
                            'application/json': {
                                'schema': {
                                    'type': 'number'
                                }
                            }
                        }
                    },
                    '401': {
                        'description': 'Unauthorized request.'
                    }
                }
            }
        }
    }

    /**
     * Generate code for swagger.
     * @param tags Tags.
     * @param simpleSchema
     * @param newSchema
     * @param routes
     * @param security
     */
    public static getSwaggerRouteGroupForAll(tags: string[], simpleSchema: string, newSchema: string, pathParameters: string[] = [], routes: string[] = ['get', 'post', 'delete'], security: string[] = []) {
        const result = { parameters: [], get: undefined, post: undefined, delete: undefined }

        result.parameters = pathParameters.map(parameter => ({
            'in': 'path',
            'name': parameter,
            'required': true,
            'schema': {
                '$ref': '#/components/schemas/Id'
            },
            'description': 'Path identificator.'
        }))

        if (routes.includes('get')) {
            result.get = {
                'tags': tags,
                'security': security.includes('get') ? [{ 'bearerAuth': [] }] : undefined,
                'summary': 'Get all items.',
                'description': 'Get basic objects of all items.',
                'parameters': [
                    {
                        'in': 'query',
                        'name': 'sort',
                        'schema': {
                            'type': 'string',
                            'example': '_id'
                        },
                        'description': 'Name of some property.'
                    },
                    {
                        'in': 'query',
                        'name': 'reverse',
                        'schema': {
                            'type': 'string',
                            'example': 'desc',
                            'enum': ['true']
                        },
                        'description': 'Reverse order of items.'
                    },
                    {
                        'in': 'query',
                        'name': 'limit',
                        'schema': {
                            'type': 'number',
                            'example': 7
                        },
                        'description': 'Max count of items.'
                    },
                    {
                        'in': 'query',
                        'name': 'offset',
                        'schema': {
                            'type': 'number',
                            'example': 353
                        },
                        'description': 'Index of first item.'
                    },
                    {
                        'in': 'query',
                        'name': 'filter',
                        'schema': {
                            'type': 'object',
                            'additionalProperties': {
                                'type': 'string'
                            }
                        },
                        'description': 'Filter items by its any property.'
                    }
                ],
                'responses': {
                    '200': {
                        'description': 'Get items is successful.',
                        'content': {
                            'application/json': {
                                'schema': {
                                    'type': 'array',
                                    'items': {
                                        '$ref': '#/components/schemas/' + simpleSchema
                                    }
                                }
                            }
                        }
                    },
                    '401': {
                        'description': 'Unauthorized request.'
                    }
                }
            }
        }

        if (routes.includes('post')) {
            result.post = {
                'tags': tags,
                'security': security.includes('post') ? [{ 'bearerAuth': [] }] : undefined,
                'summary': 'Create new item.',
                'description': 'Create new item and return ID of created item.',
                'requestBody': {
                    'content': {
                        'application/json': {
                            'schema': {
                                '$ref': '#/components/schemas/' + newSchema
                            }
                        }
                    }
                },
                'responses': {
                    '200': {
                        'description': 'Item was successful created.',
                        'content': {
                            'application/json': {
                                'schema': {
                                    'type': 'object',
                                    'properties': {
                                        '_id': {
                                            '$ref': '#/components/schemas/Id'
                                        }
                                    }
                                }
                            }
                        }
                    },
                    '400': {
                        'description': 'Invalid values.'
                    },
                    '401': {
                        'description': 'Unauthorized request.'
                    },
                    '409': {
                        'description': 'Duplicate values.'
                    }
                }
            }
        }

        if (routes.includes('delete')) {
            result.delete = {
                'tags': tags,
                'security': security.includes('delete') ? [{ 'bearerAuth': [] }] : undefined,
                'summary': 'Delete all items.',
                'description': 'Delete all items and return count of deleted items.',
                'responses': {
                    '200': {
                        'description': 'Items were successful deleted.',
                        'content': {
                            'application/json': {
                                'schema': {
                                    'type': 'object',
                                    'properties': {
                                        'count': {
                                            'type': 'number',
                                            'example': 7
                                        }
                                    }
                                }
                            }
                        }
                    },
                    '401': {
                        'description': 'Unauthorized request.'
                    },
                    '404': {
                        'description': 'There is no items to delete.'
                    }
                }
            }
        }

        return result
    }

}

export default Route