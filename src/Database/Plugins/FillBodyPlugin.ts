import Physics from '../../Utils/Physics'

/**
 * Plugin to fill fields of body schema with calculated data.
 * @param schema Schema.
 */
const FillBodyPlugin = (schema) => {

    schema.post('find', docs => {
        for (const doc of docs) {
            fillBody(doc)
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

const fillBody = (body: ISimpleBody) => {
    body.diameter.y = Physics.getDiameterY(body)
    body.diameter.z = Physics.getDiameterZ(body)
    body.flattening = Physics.getFlattening(body)
    body.circuit = Physics.getBodyCircuit(body)
    body.surface = Physics.getSurface(body)
    body.volume = Physics.getVolume(body)
    body.density = Physics.getDensity(body)
    body.escapeVelocity = Physics.getEscapeVelocity(body)
    body.luminosity = Physics.getLuminosity(body)
    body.gravitationalAcceleration = Physics.getGravitationalAcceleration(body)
    body.axis.velocity = Physics.getAxisVelocity(body)

    if (body.orbit) {
        body.orbit.circuit = Physics.getOrbitCircuit(body)
        body.orbit.velocity = Physics.getOrbitVelocity(body)
        body.orbit.semiMajorAxis = Physics.getSemiMajorAxis(body)
    }
}

export default FillBodyPlugin