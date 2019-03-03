import Physics from '../../Utils/Physics'
import Units from '../../Client/src/Utils/Utils/Units'

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

// Za kolik let 360°?

const fillBody = (body: Universis.Universe.Body.Simple) => {
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
        body.orbit.semiMajorAxis = Physics.getSemiMajorAxis(body)

        body.temp = {
            orbitAreaPerSecond: Physics.getOrbitArea(body) / (31556926 * body.orbit.period)
        }

        body.orbit.velocity = Physics.getOrbitVelocity(body)
    }
}

export default FillBodyPlugin