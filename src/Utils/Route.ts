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
                }).catch(error => {
                    response.sendStatus(error)
            })
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
     * Run route handler in authenticated cases.
     * @param action Request action.
     * @param resultMap Convert model result to response data.
     */
    public static onlyAuthenticated(action: IRouteAction, resultMap?: IResultMap): IRequestHandler {
        return null
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
     * @returns Route group.
     */
    public static getRouteGroupForAll(model: IEntityModel<any, any, any>): IRouteGroupForAll {
        return {
            get: Route.all(({ query }) => (
                model.getAll(
                    Route.getFilterFromQuery(query),
                    query.sort,
                    query.order,
                    parseInt(query.limit),
                    parseInt(query.offset)
                ))
            ),
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
            ), false),
            delete: Route.all(({ params }) => (
                model.remove(params.bodyId, false)
            ), false)
        }
    }

    public static getRouteGroupForCount(model: IEntityModel<any, any, any>): IRouteGroupForCount {
        return {
            get: Route.all(() => model.getCount())
        }
    }

    public static getSwaggerRouteGroupForOne(tags, id, schema) {
        return {
            'parameters': [
                {
                    'in': 'path',
                    'name': id,
                    'required': true,
                    'schema': {
                        '$ref': '#/components/schemas/Id'
                    },
                    'description': 'Unique identifier of item.'
                }
            ],
            'get': {
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
                        'description': 'Body with ID was not found.'
                    }
                }
            },
            'put': {
                'tags': ['Bodies'],
                'summary': 'Update already existing body.',
                'description': 'Create new body and return ID of created body.',
                'requestBody': {
                    'content': {
                        'application/json': {
                            'schema': {
                                '$ref': '#/components/schemas/NewBody'
                            },
                        }
                    }
                },
                'responses': {
                    '204': {
                        'description': 'Body was successful updated.'
                    },
                    '400': {
                        'description': 'Invalid values.'
                    },
                    '404': {
                        'description': 'Body with ID was not found.'
                    },
                    '409': {
                        'description': 'Body with this name already exists.'
                    }
                }
            },
            'delete': {
                'tags': ['Bodies'],
                'summary': 'Delete body by ID.',
                'description': 'Delete body by ID.',
                'parameters': [
                    {
                        'in': 'query',
                        'name': 'force',
                        'schema': {
                            'type': 'string',
                            'example': 'true',
                            'enum': ['true', 'false']
                        },
                        'description': 'Body will be deleted with all its children.'
                    }
                ],
                'responses': {
                    '204': {
                        'description': 'Body was successful deleted.'
                    },
                    '400': {
                        'description': 'Body cannot be deleted, because of existing children.'
                    },
                    '404': {
                        'description': 'Body with ID was not found.'
                    }
                }
            }
        }
    }

    public static getSwaggerRouteGroupForAll(tags, simpleSchema, newSchema) {
        return {
            'get': {
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
            },
            'post': {
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
            },
            'delete': {
                'tags': tags,
                'summary': 'Delete all items.',
                'description': 'Delete all items and return count of deleted items.',
                'responses': {
                    '200': {
                        'description': 'Items was successful deleted.',
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
    }

}

export default Route