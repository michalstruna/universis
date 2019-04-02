import { Schema } from 'mongoose'

import { DatabaseModels } from '../../Constants'
import FillBodyPlugin from '../Plugins/FillBodyPlugin'

/**
 * DB schema for body.
 */
const BodySchema = new Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },

    diameter: {
        x: {
            type: Number,
            required: true,
            min: 0
        },
        y: {
            type: Number,
            required: false,
            min: 0
        },
        z: {
            type: Number,
            required: false,
            min: 0
        }
    },

    mass: {
        type: Number,
        required: true,
        min: 0
    },

    temperature: {
        outer: {
            type: Number,
            required: false,
            min: 0
        },

        inner: {
            type: Number,
            required: false,
            min: 0
        }
    },

    axis: {
        period: {
            type: Number,
            required: true,
            min: 0
        },

        tilt: {
            type: Number,
            required: true,
            min: -360,
            max: 360
        },

        initialDate: {
            type: Number,
            default: () => new Date().getTime()
        }
    },

    albedo: {
        type: Number,
        required: false,
        min: 0
    },

    composition: {
        type: [
            {
                element: {
                    type: String,
                    required: true
                },
                percentage: {
                    type: Number,
                    required: true,
                    min: 0,
                    max: 100
                }
            }
        ],
        default: [],
        required: true
    },

    rings: {
        type: [
            {
                diameter: {
                    min: {
                        type: Number,
                        required: true,
                        min: 0
                    },
                    max: {
                        type: Number,
                        required: true,
                        min: 1
                    }
                },
                texture: {
                    type: String,
                    required: true
                }

            }
        ],
        default: [],
        required: true
    },

    texture: {
        type: String,
        required: true
    },

    discover: {
        author: {
            type: String,
            default: null
        },
        date: {
            type: String,
            default: null
        }
    },

    typeId: {
        type: Schema.Types.ObjectId,
        ref: DatabaseModels.BODY_TYPE,
        required: true
    },

    parentId: {
        type: Schema.Types.ObjectId,
        ref: DatabaseModels.BODY,
        required: false
    },

    orbit: {
        apsis: {
            type: Number,
            required: false,
            min: 0
        },

        periapsis: {
            type: Number,
            required: false,
            min: 0
        },

        eccentricity: {
            type: Number,
            required: false,
            min: 0,
            max: 2
        },

        inclination: {
            type: Number,
            required: false,
            min: -360,
            max: 360
        },

        rotation: {
            type: Number,
            required: false,
            min: 0,
            max: 360
        },

        initialDate: {
            type: Number,
            default: () => new Date().getTime()
        },
    },

    position: {
        alpha: {
            type: Number,
            required: false,
            min: 0,
            max: 360
        },
        beta: {
            type: Number,
            required: false,
            min: 0,
            max: 360
        },
        distance: {
            type: Number,
            required: false,
            min: 0
        }
    },

    nearest: {
        type: Number,
        required: false,
        min: 0
    },

    magnitude: {
        relative: {
            type: Number
        },
        absolute: {
            type: Number
        }
    },

    atmosphere: {
        composition: {
            type: [
                {
                    element: {
                        type: String,
                        required: true
                    },
                    percentage: {
                        type: Number,
                        required: true,
                        min: 0,
                        max: 100
                    }
                }
            ],
            default: []
        },
        pressure: {
            type: Number
        }
    },

    description: {
        type: String,
        default: ''
    },

    particles: {

        thickness: {
            type: Number
        },

        count: {
            type: Number,
            required: true
        },

        size: {
            type: Number,
            required: true
        }

    },

    __v: {
        type: Number,
        select: false
    }

})

BodySchema.plugin(FillBodyPlugin)

export default BodySchema