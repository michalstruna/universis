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

// Za kolik let 360°?

const fillBody = (body: Universis.Universe.Body.Simple, bodies?: Universis.Universe.Body.Simple[]) => {
    const parent = bodies ? bodies.find(item => (body.parentId && item._id.toString() === body.parentId.toString())) : body.parent
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
        body.orbit.semiMajorAxis = Physics.getSemiMajorAxis(body)
        body.orbit.semiMinorAxis = Physics.getSemiMinorAxis(body)
        body.orbit.circuit = Physics.getOrbitCircuit(body)
        // TODO: Obsah orbity?
        body.orbit.period = Physics.getOrbitPeriod(body, parent)

        body.orbit.velocity = {
            min: Physics.getOrbitVelocity(body, parent, body.orbit.apoapsis),
            avg: Physics.getOrbitVelocity(body, parent, body.orbit.semiMajorAxis),
            max: Physics.getOrbitVelocity(body, parent, body.orbit.periapsis)
        }
    }
}

export default FillBodyPlugin