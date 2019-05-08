import Physics from '../../Utils/Physics'

/**
 * Plugin to fill fields of body schema with calculated data.
 * @param schema Schema.
 */
const FillBodyPlugin = (schema) => {

    schema.post('find', docs => {
        for (const doc of docs) {
            fillBody(doc, docs)
        }
    })

    schema.post('findOne', doc => {
        fillBody(doc)
    })

    schema.post('aggregate', docs => {
        for (const doc of docs) {
            fillBody(doc)
        }
    })

}

const fillBody = (body: Universis.Universe.Body.Simple, bodies?: Universis.Universe.Body.Simple[]) => {
    let parent = bodies ? bodies.find(item => (body.parentId && item._id.toString() === body.parentId.toString())) : (body.parent)
    body.diameter.y = Physics.getDiameterY(body)
    body.diameter.z = Physics.getDiameterZ(body)
    body.circuit = Physics.getBodyCircuit(body)
    body.volume = Physics.getVolume(body)
    body.surface = Physics.getSurface(body)
    body.flattening = Physics.getFlattening(body)
    body.density = Physics.getDensity(body)
    body.axis.velocity = Physics.getAxisVelocity(body)
    body.escapeVelocity = Physics.getEscapeVelocity(body)
    body.gravitationalAcceleration = Physics.getGravitationalAcceleration(body)
    body.luminosity = Physics.getLuminosity(body)
    body.gravitationalParameter = Physics.getGravitationalParameter(body)

    if (body.orbit && parent) {
        if (!body.orbit.eccentricity) {
            body.orbit.eccentricity = 0
        }

        if (!body.orbit.rotation) {
            body.orbit.rotation = 0
        }

        if (!body.orbit.inclination) {
            body.orbit.inclination = 0
        }

        body.orbit.semiMajorAxis = Physics.getSemiMajorAxis(body)
        body.orbit.semiMinorAxis = Physics.getSemiMinorAxis(body)
        body.orbit.circuit = Physics.getOrbitCircuit(body)
        body.orbit.period = Physics.getOrbitPeriod(body, parent)
        body.orbit.angleVelocity = Physics.getAngleVelocity(body)

        body.orbit.velocity = {
            min: Physics.getOrbitVelocity(body, parent, body.orbit.apsis),
            avg: Physics.getOrbitVelocity(body, parent, body.orbit.semiMajorAxis),
            max: Physics.getOrbitVelocity(body, parent, body.orbit.periapsis)
        }
    }
}

export default FillBodyPlugin