import { Schema } from 'mongoose'

import { DatabaseModels } from '../../Constants'

/**
 * DB schema for short body.
 */
const BodySchema = new Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },

    diameter: {
        equatorial: {
            type: Number,
            required: true,
            min: 0
        },
        polar: {
            type: Number,
            required: true,
            min: 0
        }
    },

    orbit: {
        apocenter: {
            type: Number,
            required: true,
            min: 0
        },
        pericenter: {
            type: Number,
            required: true,
            min: 0
        },
        eccentricity: {
            type: Number,
            required: true,
            min: 0,
            max: 2
        },
        inclination: {
            type: Number,
            required: true,
            min: -360,
            max: 360
        },
        startAngle: {
            type: Number,
            required: true,
            min: 0, max: 360
        },
        period: {
            type: Number,
            required: true,
            min: 0
        },
        rotation: {
            type: Number,
            required: true,
            min: 0,
            max: 360
        }
    },

    period: {
        type: Number,
        required: true,
        min: 0
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
        required: true
    },

    texture: {
        type: String,
        required: true
    },

    tilt: {
        type: Number,
        required: true,
        min: -360,
        max: 360
    },

    typeId: {
        type: Schema.Types.ObjectId,
        ref: DatabaseModels.BODY_TYPE,
        required: true
    },

    parentId: {
        type: Schema.Types.ObjectId,
        ref: DatabaseModels.BODY,
        required: true
    },

    __v: {
        type: Number,
        select: false
    }

})

export default BodySchema