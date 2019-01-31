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
            'url': 'http://localhost:3000',
            'description': 'Default local develop server\'s url.'
        },
        {
            'url': 'http://universis.herokuapp.com',
            'description': 'Production server.'
        },
        {
            'url': 'https://universis.herokuapp.com',
            'description': 'Secure production server.'
        }
    ],
    'paths': {
        '/bodies': Route.getSwaggerRouteGroupForAll(['Bodies'], 'SimpleBody', 'NewBody'),
        '/bodies/{bodyId}': Route.getSwaggerRouteGroupForOne(['Bodies'], 'Body', ['bodyId']),
        '/bodies/count': Route.getSwaggerRouteGroupForCount(['Bodies']),
        '/bodies/{bodyId}/events': Route.getSwaggerRouteGroupForAll(['Body events'], 'BodyEvent', 'NewBodyEvent'),
        '/bodies/events/{eventId}': Route.getSwaggerRouteGroupForOne(['Body events'], 'Body', ['bodyId', 'eventId']),
        '/bodies/{bodyId}/events/count': Route.getSwaggerRouteGroupForCount(['Body events']),
        '/bodyTypes': Route.getSwaggerRouteGroupForAll(['Body types'], 'BodyType', 'NewBodyType'),
        '/bodyTypes/{bodyTypeId}': Route.getSwaggerRouteGroupForOne(['Body types'], 'BodyType', ['bodyTypeId']),
        '/bodyTypes/count': Route.getSwaggerRouteGroupForCount(['Body types']),
        '/users': Route.getSwaggerRouteGroupForAll(['Users'], 'SimpleUser', 'NewUser'),
        '/users/{userId}': Route.getSwaggerRouteGroupForOne(['Users'], 'User', ['userId']),
        '/users/count': Route.getSwaggerRouteGroupForCount(['Users']),
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
        },
        '/notifications': Route.getSwaggerRouteGroupForAll(['Notifications'], 'Notification', 'NewNotification'),
        '/notifications/{notificationId}': Route.getSwaggerRouteGroupForOne(['Notifications'], 'Notification', ['notificationId']),
        '/notifications/count': Route.getSwaggerRouteGroupForCount(['Notifications']),
    },
    'components': {
        'schemas': {
            'NewBody': {
                'type': 'object',
                'properties': {
                    'name': {
                        'type': 'string',
                        'example': 'Země'
                    },
                    'diameter': {
                        'type': 'object',
                        'properties': {
                            'x': {
                                'type': 'number',
                                'example': 12756
                            },
                            'y': {
                                'type': 'number',
                                'example': 12713
                            },
                            'z': {
                                'type': 'number',
                                'example': 12756
                            }
                        }
                    },
                    'mass': {
                        'type': 'number',
                        'example': 753951445667
                    },
                    'moveSpeed': {
                        'type': 'object',
                        'properties': {
                            'max': {
                                'type': 'number',
                                'example': 33
                            },
                            'min': {
                                'type': 'number',
                                'example': 27.3
                            },
                        }
                    },
                    'magnitude': {
                        'type': 'object',
                        'properties': {
                            'relative': {
                                'type': 'number',
                                'example': -3.5
                            },
                            'absolute': {
                                'type': 'number',
                                'example': 2.26
                            },
                        }
                    },
                    'temperature': {
                        'type': 'object',
                        'properties': {
                            'inner': {
                                'type': 'number',
                                'example': 5800
                            },
                            'outer': {
                                'type': 'number',
                                'example': 15
                            }
                        }
                    },
                    'axis': {
                        'type': 'object',
                        'properties': {
                            'period': {
                                'type': 'number',
                                'example': 1.12
                            },
                            'tilt': {
                                'type': 'number',
                                'example': 7.26
                            }
                        }
                    },
                    'albedo': {
                        'type': 'number',
                        'example': 0.64
                    },
                    'composition': {
                        'type': 'array',
                        'items': {
                            'type': 'object',
                            'properties': {
                                'element': {
                                    'type': 'string',
                                    'example': 'He'
                                },
                                'percentage': {
                                    'type': 'number',
                                    'example': 75
                                }
                            }
                        }
                    },
                    'atmosphereComposition': {
                        'type': 'array',
                        'items': {
                            'type': 'object',
                            'properties': {
                                'element': {
                                    'type': 'string',
                                    'example': 'He'
                                },
                                'percentage': {
                                    'type': 'number',
                                    'example': 75
                                }
                            }
                        }
                    },
                    'description': {
                        'type': 'string',
                        'example': 'Jupiter is largest planet in solar system.'
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
                                    'example': 'SaturnRing.png'
                                }
                            }
                        }
                    },
                    'texture': {
                        'type': 'string',
                        'example': 'Earth.jpg'
                    },
                    'discover': {
                        'type': 'object',
                        'properties': {
                            'author': {
                                'type': 'string',
                                'example': 'William Herschel'
                            },
                            'date': {
                                'type': 'string',
                                'example': '2018-11-03'
                            }
                        }
                    },
                    'typeId': {
                        '$ref': '#/components/schemas/Id'
                    },
                    'parentId': {
                        '$ref': '#/components/schemas/Id'
                    },
                    'orbit': {
                        '$ref': '#components/schemas/Orbit'
                    },
                    'position': {
                        '$ref': '#components/schemas/Position'
                    }
                }
            },
            'Body': {
                'allOf': [
                    {
                        '$ref': '#/components/schemas/SimpleBody'
                    }
                ]
            },
            'SimpleBody': {
                'type': 'object',
                'properties': {
                    '_id': {
                        '$ref': '#/components/schemas/Id'
                    },
                    'name': {
                        'type': 'string',
                        'example': 'Země'
                    },
                    'diameter': {
                        'type': 'object',
                        'properties': {
                            'x': {
                                'type': 'number',
                                'example': 12756
                            },
                            'y': {
                                'type': 'number',
                                'example': 12713
                            },
                            'z': {
                                'type': 'number',
                                'example': 12756
                            }
                        }
                    },
                    'flattening': {
                        'type': 'number',
                        'example': 0.1
                    },
                    'surface': {
                        'type': 'number',
                        'example': 446752718
                    },
                    'volume': {
                        'type': 'number',
                        'example': 77852467894456
                    },
                    'mass': {
                        'type': 'number',
                        'example': 753951445667
                    },
                    'density': {
                        'type': 'number',
                        'example': 5515
                    },
                    'escapeVelocity': {
                        'type': 'number',
                        'example': 11
                    },
                    'satellitesCount': {
                        'type': 'number',
                        'example': 11
                    },
                    'moveSpeed': {
                        'type': 'object',
                        'properties': {
                            'max': {
                                'type': 'number',
                                'example': 33
                            },
                            'min': {
                                'type': 'number',
                                'example': 27.3
                            },
                        }
                    },
                    'magnitude': {
                        'type': 'object',
                        'properties': {
                            'relative': {
                                'type': 'number',
                                'example': -3.5
                            },
                            'absolute': {
                                'type': 'number',
                                'example': 2.26
                            },
                        }
                    },
                    'temperature': {
                        'type': 'object',
                        'properties': {
                            'inner': {
                                'type': 'number',
                                'example': 5800
                            },
                            'outer': {
                                'type': 'number',
                                'example': 15
                            }
                        }
                    },
                    'axis': {
                        'type': 'object',
                        'properties': {
                            'period': {
                                'type': 'number',
                                'example': 1.12
                            },
                            'tilt': {
                                'type': 'number',
                                'example': 7.26
                            },
                            'rotationSpeed': {
                                'type': 'number',
                                'example': 465
                            }
                        }
                    },
                    'albedo': {
                        'type': 'number',
                        'example': 0.64
                    },
                    'composition': {
                        'type': 'array',
                        'items': {
                            'type': 'object',
                            'properties': {
                                'element': {
                                    'type': 'string',
                                    'example': 'He'
                                },
                                'percentage': {
                                    'type': 'number',
                                    'example': 75
                                }
                            }
                        }
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
                                    'example': 'SaturnRing.png'
                                }
                            }
                        }
                    },
                    'texture': {
                        'type': 'string',
                        'example': 'Earth.jpg'
                    },
                    'discover': {
                        'type': 'object',
                        'properties': {
                            'author': {
                                'type': 'string',
                                'example': 'William Herschel'
                            },
                            'date': {
                                'type': 'string',
                                'example': '2018-11-03'
                            }
                        }
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
                    },
                    'orbit': {
                        '$ref': '#components/schemas/Orbit'
                    },
                    'position': {
                        '$ref': '#components/schemas/Position'
                    }
                }
            },
            'Orbit': {
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
                    },
                    'circuit': {
                        'type': 'number',
                        'example': 1
                    },
                    'velocity': {
                        'type': 'number',
                        'example': 1
                    }
                }
            },
            'Position': {
                'type': 'object',
                'properties': {
                    'alpha': {
                        'type': 'number',
                        'example': 359.68
                    },
                    'beta': {
                        'type': 'number',
                        'example': 2.21
                    },
                    'distance': {
                        'type': 'number',
                        'example': 149597870
                    }
                }
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
                'type': 'object',
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
                        '$ref': '#components/schemas/NewBodyType'
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
            },
            'NewBodyEvent': {
                'type': 'object',
                'properties': {
                    'title': {
                        'type': 'string',
                        'example': 'První život'
                    },
                    'description': {
                        'type': 'string',
                        'example': 'První jednobuněčné organismy se vyvinuly ve vodě a umožnily vznik složitějších organismů.'
                    },
                    'from': {
                        'type': 'number',
                        'example': -3500000000
                    },
                    'to': {
                        'type': 'number',
                        'example': -3000000000
                    },
                    'bodyId': {
                        '$ref': '#/components/schemas/Id'
                    },
                }
            },
            'BodyEvent': {
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
                        '$ref': '#/components/schemas/NewBodyEvent'
                    }
                ]
            }
        }
    }
}


