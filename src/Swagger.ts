import Route from './Utils/Route'

export default {
    'openapi': '3.0.0',
    'info': {
        'version': '0.0.1',
        'title': 'Universis API',
        'description': 'API for Universis application.',
        'contact': {
            'name': 'Michal Struna',
            'email': 'michal.l.struna@gmail.com'
        }
    },
    'servers': [
        {
            'url': 'http://localhost:1997',
            'description': 'Default local develop server\'s url.'
        }
    ],
    'paths': {
        '/bodies': Route.getSwaggerRouteGroupForAll(['Bodies'], 'SimpleBody', 'NewBody'),
        '/bodies/{bodyId}': {
            'parameters': [
                {
                    'in': 'path',
                    'name': 'bodyId',
                    'required': true,
                    'schema': {
                        '$ref': '#/components/schemas/Id'
                    },
                    'description': 'Unique identifier of body.'
                }
            ],
            'get': {
                'tags': ['Bodies'],
                'summary': 'Get body by ID.',
                'description': 'Get body by ID.',
                'responses': {
                    '200': {
                        'description': 'Get body is successful.',
                        'content': {
                            'application/json': {
                                'schema': {
                                    '$ref': '#/components/schemas/Body'
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
        },
        '/bodies/count': {
            'get': {
                'tags': ['Bodies'],
                'summary': 'Get count of all bodies.',
                'description': 'Get count of all bodies.',
                'responses': {
                    '200': {
                        'description': 'Get bodies count is successful.',
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
        },
        '/bodyTypes': {
            'get': {
                'tags': ['Body types'],
                'summary': 'Get all body types.',
                'description': 'Get all body types.',
                'parameters': [
                    {
                        'in': 'query',
                        'name': 'limit',
                        'schema': {
                            'type': 'number',
                            'example': 7
                        },
                        'description': 'Max count of body types.'
                    },
                    {
                        'in': 'query',
                        'name': 'offset',
                        'schema': {
                            'type': 'number',
                            'example': 353
                        },
                        'description': 'Index of first body type.'
                    },
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
                        'description': 'Order of body types. Default is asc. Desc is reverse order.'
                    },
                    {
                        'in': 'query',
                        'name': 'params',
                        'schema': {
                            'type': 'object',
                            'additionalProperties': {
                                'type': 'string'
                            }
                        },
                        'description': 'Filter bodies by its any property.'
                    }
                ],
                'responses': {
                    '200': {
                        'description': 'Get body types is successful.',
                        'content': {
                            'application/json': {
                                'schema': {
                                    'type': 'array',
                                    'items': {
                                        '$ref': '#/components/schemas/BodyType'
                                    }
                                }
                            }
                        }
                    }
                }
            },
            'post': {
                'tags': ['Body types'],
                'summary': 'Create new body type.',
                'description': 'Create new body type and return created body type.',
                'requestBody': {
                    'content': {
                        'application/json': {
                            'schema': {
                                'type': 'object',
                                'properties': {
                                    'name': {
                                        'type': 'string',
                                        'example': 'Terestrická planeta'
                                    }
                                }
                            }
                        }
                    }
                },
                'responses': {
                    '200': {
                        'description': 'Body type was successful created.'
                    },
                    '400': {
                        'description': 'Invalid name.'
                    },
                    '409': {
                        'description': 'Body type with this name already exists.'
                    }
                }
            },
            'delete': {
                'tags': ['Body types'],
                'summary': 'Delete all body types.',
                'description': 'Delete all body types.',
                'responses': {
                    '204': {
                        'description': 'Body types was successful deleted.'
                    },
                    '404': {
                        'description': 'There is no body type to remove.'
                    },
                    '409': {
                        'description': 'There are bodies with any body types.'
                    }
                }
            }
        },
        '/bodyTypes/{bodyTypeId}': {
            'parameters': [
                {
                    'in': 'path',
                    'name': 'bodyTypeId',
                    'required': true,
                    'schema': {
                        '$ref': '#/components/schemas/Id'
                    },
                    'description': 'Unique identifier of body type.'
                }
            ],
            'get': {
                'tags': ['Body types'],
                'summary': 'Get body type by ID.',
                'description': 'Get body type by ID.',
                'responses': {
                    '200': {
                        'description': 'Get body type is successful.',
                        'content': {
                            'application/json': {
                                'schema': {
                                    '$ref': '#/components/schemas/BodyType'
                                }
                            }
                        }
                    },
                    '404': {
                        'description': 'Body type with ID was not found.'
                    }
                }
            },
            'put': {
                'tags': ['Body types'],
                'summary': 'Update already existing body type.',
                'description': 'Update already existing body type.',
                'requestBody': {
                    'content': {
                        'application/json': {
                            'schema': {
                                '$ref': '#/components/schemas/NewBodyType'
                            }
                        }
                    }
                },
                'responses': {
                    '204': {
                        'description': 'Body type was successful updated.'
                    },
                    '400': {
                        'description': 'Invalid name.'
                    },
                    '404': {
                        'description': 'Body type with ID was not found.'
                    },
                    '409': {
                        'description': 'Body type with this name already exists.'
                    }
                }
            },
            'delete': {
                'tags': ['Body types'],
                'summary': 'Delete body type by ID.',
                'description': 'Delete body type by ID.',
                'responses': {
                    '204': {
                        'description': 'Body type was successful deleted.'
                    },
                    '400': {
                        'description': 'Body type cannot be deleted, because of existing body with this type.'
                    },
                    '404': {
                        'description': 'Body type with ID was not found.'
                    }
                }
            }
        },
        '/bodyTypes/count': {
            'get': {
                'tags': ['Body types'],
                'summary': 'Get count of all body types.',
                'description': 'Get count of all body types.',
                'responses': {
                    '200': {
                        'description': 'Get body types count is successful.',
                        'content': {
                            'application/json': {
                                'schema': {
                                    'type': 'number'
                                }
                            }
                        }
                    },
                }
            }
        },
        '/users': Route.getSwaggerRouteGroupForAll(['Users'], 'SimpleUser', 'NewUser'),
        '/users/{userId}': {
            'parameters': [
                {
                    'in': 'path',
                    'name': 'userId',
                    'required': true,
                    'schema': {
                        '$ref': '#/components/schemas/Id'
                    },
                    'description': 'Unique identifier of user.'
                }
            ],
            'get': {
                'tags': ['Users'],
                'summary': 'Get user by ID.',
                'description': 'Get user by ID.',
                'responses': {
                    '200': {
                        'description': 'Get user is successful.',
                        'content': {
                            'application/json': {
                                'schema': {
                                    '$ref': '#/components/schemas/User'
                                }
                            }
                        }
                    },
                    '404': {
                        'description': 'User with ID was not found.'
                    }
                }
            },
            'put': {
                'tags': ['Users'],
                'summary': 'Update already existing user.',
                'description': 'Update already existing user.',
                'requestBody': {
                    'content': {
                        'application/json': {
                            'schema': {
                                '$ref': '#/components/schemas/NewUser'
                            }
                        }
                    }
                },
                'responses': {
                    '204': {
                        'description': 'User was successful updated.'
                    },
                    '400': {
                        'description': 'Invalid values.'
                    },
                    '404': {
                        'description': 'User with ID was not found.'
                    },
                    '409': {
                        'description': 'User with this email already exists.'
                    }
                }
            },
            'delete': {
                'tags': ['Users'],
                'summary': 'Delete user by ID.',
                'description': 'Delete user by ID.',
                'responses': {
                    '204': {
                        'description': 'User was successful deleted.'
                    },
                    '400': {
                        'description': 'User cannot be deleted, because of existing dependents.'
                    },
                    '404': {
                        'description': 'User with ID was not found.'
                    }
                }
            }
        },
        '/users/count': {
            'get': {
                'tags': ['Users'],
                'summary': 'Get count of all users.',
                'description': 'Get count of all users.',
                'responses': {
                    '200': {
                        'description': 'Get users count is successful.',
                        'content': {
                            'application/json': {
                                'schema': {
                                    'type': 'number'
                                }
                            }
                        }
                    },
                }
            }
        },
        '/login': {
            'post': {
                'tags': ['Users'],
                'summary': 'Login user with credentials.',
                'description': 'Login user with credentials.',
                'requestBody': {
                    'content': {
                        'application/json': {
                            'schema': {
                                'type': 'object',
                                'properties': {
                                    'email': {
                                        'type': 'string'
                                    },
                                    'password': {
                                        'type': 'string'
                                    }
                                }
                            }
                        }
                    }
                },
                'responses': {
                    '200': {
                        'description': 'Successful login.',
                        'content': {
                            'application/json': {
                                'schema': {
                                    '$ref': '#/components/schemas/UserIdentity'
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    'components': {
        'schemas': {
            'NewSimpleBody': {
                'type': 'object',
                'properties': {
                    'name': {
                        'type': 'string',
                        'example': 'Země'
                    },
                    'diameter': {
                        'type': 'object',
                        'properties': {
                            'equatorial': {
                                'type': 'number',
                                'example': 12756
                            },
                            'polar': {
                                'type': 'number',
                                'example': 12713
                            }
                        }
                    },
                    'orbit': {
                        'type': 'object',
                        'properties': {
                            'apocenter': {
                                'type': 'number',
                                'example': 152097701
                            },
                            'pericenter': {
                                'type': 'number',
                                'example': 147098074
                            },
                            'eccentricity': {
                                'type': 'number',
                                'example': 0.01671022
                            },
                            'inclination': {
                                'type': 'number',
                                'example': 7.25
                            },
                            'startAngle': {
                                'type': 'number',
                                'example': 0
                            },
                            'period': {
                                'type': 'number',
                                'example': 1
                            }
                        }
                    },
                    'period': {
                        'type': 'number',
                        'example': 1
                    },
                    'rings': {
                        'type': 'array',
                        'items': {
                            'type': 'object',
                            'properties': {
                                'diameter': {
                                    'type': 'object',
                                    'properties': {
                                        'min': {
                                            'type': 'number',
                                            'example': 15000
                                        },
                                        'max': {
                                            'type': 'number',
                                            'example': 17250
                                        }
                                    }
                                },
                                'texture': {
                                    'type': 'string',
                                    'example': 'EarthRing.png'
                                }
                            }
                        }
                    },
                    'texture': {
                        'type': 'string',
                        'example': 'Earth.jpg'
                    },
                    'tilt': {
                        'type': 'number',
                        'example': 2.29
                    },
                    'type': {
                        'type': 'object',
                        'properties': {
                            '_id': {
                                '$ref': '#/components/schemas/Id'
                            },
                            'name': {
                                'type': 'string'
                            },
                            'emissiveColor': {
                                'type': 'number'
                            }
                        }
                    },
                    'parentId': {
                        '$ref': '#/components/schemas/Id'
                    }
                }
            },
            'NewBody': {
                'allOf': [
                    {
                        '$ref': '#/components/schemas/NewSimpleBody'
                    }
                ]
            },
            'SimpleBody': {
                'allOf': [
                    {
                        'type': 'object',
                        'properties': {
                            '_id': {
                                '$ref': '#/components/schemas/Id'
                            }
                        }
                    },
                    {
                        '$ref': '#/components/schemas/NewSimpleBody'
                    }
                ]
            },
            'Body': {
                'allOf': [
                    {
                        '$ref': '#/components/schemas/SimpleBody'
                    },
                    {
                        '$ref': '#/components/schemas/NewBody'
                    }
                ]
            },
            'Id': {
                'type': 'string',
                'minLength': 24,
                'maxLength': 24,
                'example': '87ac4247acf457229c9aa7ae',
                'description': 'Unique identifier.'
            },
            'NewBodyType': {
                'type': 'object',
                'properties': {
                    'name': {
                        'type': 'string',
                        'example': 'Terestrická planeta',
                        'description': 'Name of body type.'
                    },
                    'emissiveColor': {
                        'type': 'number',
                        'example': '0xaabbcc',
                        'description': 'Emissive color of bodies with this type.'
                    }
                }
            },
            'BodyType': {
                'allOf': [
                    {
                        'type': 'object',
                        'properties': {
                            '_id': {
                                '$ref': '#/components/schemas/Id'
                            }
                        }
                    },
                    {
                        '$ref': '#/components/schemas/NewBodyType'
                    }
                ]
            },
            'NewBodyEvent': {
                'type': 'object',
                'properties': {
                    'title': {
                        'type': 'string'
                    },
                    'content': {
                        'type': 'string'
                    },
                    'year': {
                        'type': 'number'
                    }
                }
            },
            'BodyEvent': {
                'allOf': [
                    {
                        'type': 'object',
                        'properties': {
                            '_id': {
                                '$ref': '#/components/schemas/Id'
                            },
                            'bodyId': {
                                '$ref': '#/components/schemas/Id'
                            }
                        }
                    },
                    {
                        '$ref': '#/components/schemas/NewBodyEvent'
                    }
                ]
            },
            'SimpleUser': {
                'type': 'object',
                'properties': {
                    '_id': {
                        '$ref': '#components/schemas/Id'
                    },
                    'email': {
                        'type': 'string',
                        'example': 'universis@gmail.com'
                    },
                    'password': {
                        'type': 'string',
                        'example': 'p4SSw0r!d'
                    },
                    'avatar': {
                        'type': 'string',
                        'example': 'https://avatar.com'
                    },
                    'name': {
                        'type': 'string',
                        'example': 'Universis'
                    }
                }
            },
            'NewUser': {
                'type': 'object',
                'properties': {
                    'email': {
                        'type': 'string',
                        'example': 'universis@gmail.com'
                    },
                    'password': {
                        'type': 'string',
                        'example': 'p4SSw0r!d'
                    },
                    'avatar': {
                        'type': 'string',
                        'example': 'https://avatar.com'
                    },
                    'name': {
                        'type': 'string',
                        'example': 'Universis'
                    }
                }
            },
            'User': {
                'type': 'object',
                'properties': {
                    '_id': {
                        '$ref': '#/components/schemas/Id'
                    },
                    'email': {
                        'type': 'string',
                        'example': 'universis@gmail.com'
                    },
                    'avatar': {
                        'type': 'string',
                        'example': 'https://avatar.com'
                    },
                    'name': {
                        'type': 'string',
                        'example': 'Universis'
                    }
                }
            },
            'UserIdentity': {
                'allOf': [
                    {
                        '$ref': '#/components/schemas/User'
                    },
                    {
                        'type': 'object',
                        'properties': {
                            'token': {
                                'type': 'string',
                                'example': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjlkN2M0NzUyODgyOTJkNjQ2OWEwYmYiLCJpYXQiOjE1MzcwNDc5NTcsImV4cCI6MTUzNzA0OTc1N30.cGTu3XyU3bstQpkC32GAXDBgr3dFjIIVyJ4-Ocm2tXQ'
                            }
                        }
                    }
                ]
            }
        }
    }
}

