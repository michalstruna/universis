import * as THREE from 'three'

/**
 * Class for select bodies by coordinates on screen.
 */
class BodySelector implements IBodySelector {

    /**
     * List of all bodies.
     */
    private bodies: THREE.Mesh[]

    /**
     * Current camera.
     */
    private camera: THREE.Camera

    /**
     * THREE.js ray caster.
     */
    private rayCaster: THREE.Raycaster

    constructor(bodies: THREE.Mesh[], camera: THREE.Camera) {
        this.bodies = bodies
        this.camera = camera
        this.rayCaster = new THREE.Raycaster()
    }

    /**
     * Select body by coordinates on screen.
     * @param x Horizontal coordinate.
     * @param y Vertical coordinate.
     * @return Selected body or null.
     */
    public select(x: number, y: number): THREE.Mesh {
        const coordinates = {
            x: (x / window.innerWidth) * 2 - 1,
            y: -(y / window.innerHeight) * 2 + 1
        }

        this.rayCaster.setFromCamera(coordinates, this.camera)
        const intersects = this.rayCaster.intersectObjects(this.bodies)

        return intersects[0] ? (intersects[0].object as THREE.Mesh) : null
    }

}

export default BodySelector