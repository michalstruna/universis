import { OK, NO_CONTENT } from 'http-status-codes'

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
        delete: Route.all
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

    private static process(action: IRouteAction, resultMap: IResultMap = defaultResultMap, isAuthorized: IIsAuthorized = defaultIsAuthorized): IRequestHandler {
        return (request, response) => {
            const requestData = {
                ...request,
                ip: request.headers['x-forwarded-for'] || request.connection.remoteAddress
            }

            return action(requestData)
                .then(result => {
                    if (typeof resultMap === 'boolean') {
                        response.sendStatus(NO_CONTENT)
                    } else {
                        response.status(OK).send(resultMap(typeof result === 'number' ? result.toString() : result))
                    }
                })
                .catch(error => {
                    response.status(error.code).send(error)
                })
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
        return null
    }

    /**
     * Run route handler only if author of request has this ID.
     * @param userId Required user's ID.
     * @param action Request action.
     * @param resultMap Convert model result to response data.
     */
    public static onlyWithId(userId: string, action: IRouteAction, resultMap?: IResultMap): IRequestHandler {
        return Route.process(action, resultMap)
    }

    private static getFilterFromQuery(query: any): any {
        const filter = {}
        const reservedQueries = ['sort', 'order', 'limit', 'offset']

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
     */ů

    public static getRouteGroupForAll(model: Universis.Model.Unspecified, access: IRouteGroupAccess = Route.DEFAULT_ROUTE_GROUP_ACCESS_FOR_ALL): IRouteGroupForAll {
        const routeGroup: IObject<IRequestHandler> = {}

        // TODO: Map before and map after.
        if (access.get && typeof access.get !== 'object') {
            routeGroup.get = access.get(({ query }) => (
                model.get(
                    Route.getFilterFromQuery(query),
                    {
                        sort: query.sort,
                        reverse: query.reverse,
                        limit: parseInt(query.limit),
                        offset: parseInt(query.offset)
                    }
                )))
        }

        if (access.post) {
            const mapBefore = 'mapBefore' in access.post ? access.post.mapBefore : request => request.body
            const mapAfter = 'mapAfter' in access.post ? access.post.mapAfter : item => item
            const handler = 'access' in access.post ? access.post.access : access.post
            routeGroup.post = handler(request => model.addOne(mapBefore(request)), mapAfter)
        }

        if (access.delete && typeof access.delete !== 'object') {
            routeGroup.delete = access.delete(() => model.remove({}), count => ({ count }))
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
        const routeGroup: IObject<IRequestHandler> = {}

        if (access.get && typeof access.get !== 'object') {
            routeGroup.get = access.get(({ params }) => model.getOne({ _id: params.bodyId }))
        }

        if (access.put && typeof access.put !== 'object') {
            routeGroup.put = access.put(({ params, body }) => model.updateOne({ _id: params.bodyId }, body), false)
        }

        if (access.delete && typeof access.delete !== 'object') {
            routeGroup.delete = access.delete(({ params }) => model.removeOne({ _id: params.bodyId }), false)
        }

        return routeGroup
    }

    public static getRouteGroupForCount(model: Universis.Model.Unspecified, access: IRouteGroupAccess = Route.DEFAULT_ROUTE_GROUP_ACCESS_FOR_COUNT): IRouteGroupForCount {
        const routeGroup: IObject<IRequestHandler> = {}

        if (access.get && typeof access.get !== 'object') {
            routeGroup.get = access.get(() => model.count({})) // TODO: Filter.
        }

        return routeGroup
    }

    public static getSwaggerRouteGroupForOne(tags: string[], schema: string, pathParameters: string[] = [], routes: string[] = ['get', 'put', 'delete']) {
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
                    '404': {
                        'description': 'Item with ID was not found.'
                    }
                }
            }
        }

        if (routes.includes('put')) {
            result.put = {
                'tags': tags,
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
                        'description': 'Item was successful updated.'
                    },
                    '400': {
                        'description': 'Invalid values.'
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
                    '404': {
                        'description': 'Item with ID was not found.'
                    }
                }
            }
        }

        return result
    }

    public static getSwaggerRouteGroupForCount(tags: string[]) {
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
     */
    public static getSwaggerRouteGroupForAll(tags: string[], simpleSchema: string, newSchema: string, pathParameters: string[] = [], routes: string[] = ['get', 'post', 'delete']) {
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
                        'name': 'order',
                        'schema': {
                            'type': 'string',
                            'example': 'desc',
                            'enum': ['asc', 'desc']
                        },
                        'description': 'Order of items. Default is asc. Desc is reverse order.'
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
                    }
                }
            }
        }

        if (routes.includes('post')) {
            result.post = {
                'tags': tags,
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
                    '409': {
                        'description': 'Duplicate values.'
                    }
                }
            }
        }

        if (routes.includes('delete')) {
            result.delete = {
                'tags': tags,
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
                    '404': {
                        'description': 'There is no items to remove.'
                    }
                }
            }
        }

        return result
    }

}

export default Route