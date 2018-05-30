import { Schema } from 'mongoose'

/**
 * DB schema for short body.
 */
const BodySchema = new Schema({
    name: { type: String, required: true, minlength: 1 },
    diameter: {
        equatorial: { type: Number, required: true, min: 0 },
        polar: { type: Number, required: true, min: 0 }
    },
    orbit: {
        apocenter: { type: Number, required: true, min: 0 },
        pericenter: { type: Number, required: true, min: 0 },
        eccentricity: { type: Number, required: true, min: 0, max: 2 },
        inclination: { type: Number, required: true, min: -360, max: 360 },
        startAngle: { type: Number, required: true, min: 0, max: 360 },
        period: { type: Number, required: true, min: 0 }
    },
    period: { type: Number, required: true, min: 0 },
    rings: {
        type: [{
            diameter: {
                min: { type: Number, required: true, min: 0 },
                max: { type: Number, required: true, min: 1 }
            },
            texture: { type: Number, required: true, minlength: 1 }

        }],
        required: true
    },
    texture: { type: String, required: true, minlength: 1 },
    tilt: { type: Number, required: true, min: -360, max: 360 },
    type: { type: Number, required: true }
})

export default BodySchema