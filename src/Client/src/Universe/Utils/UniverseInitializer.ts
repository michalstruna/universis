import * as THREE from 'three'

import Config from '../Constants/Config'
import BodyFactory from './BodyFactory'

/**
 * Utils for universe.
 */
class UniverseInitializer {

    public readonly element: HTMLElement
    public readonly bodies: IBodyContainer[]
    public readonly bodyFactory: IFactory<ISimpleBody, IBodyContainer>

    public readonly scene: THREE.Scene
    public readonly renderer: THREE.WebGLRenderer
    public readonly lightColor: THREE.AmbientLight
    public readonly darkColor: THREE.AmbientLight

    /**
     * Create universe.
     * @param element Target. There will be canvas with universe.
     * @param bodies List of all bodies.
     */
    public constructor(element: HTMLElement, bodies: ISimpleBody[]) {
        this.element = element
        this.renderer = this.createRenderer()
        this.bodyFactory = new BodyFactory()
        element.appendChild(this.renderer.domElement)
        this.bodies = this.createBodies(bodies)
    }

    /**
     * Create bodies in universe and assign them to parents.
     * @param bodies List of all bodies.
     */
    private createBodies(bodies: ISimpleBody[]): IBodyContainer[] {
        const bodyContainers = []

        for (const data of bodies) {
            this.setScale(data)

            const body = this.bodyFactory.create(data)
            bodyContainers.push(body)
            this.element.appendChild(body.label)

            if (data.parentId) {
                this.scene.getObjectByName(data.parentId).children[0].add(body.orbit)
            } else {
                this.scene.add(body.orbit)
            }
        }

        return bodyContainers
    }

    /**
     * Set scale of all distances and sizes in universe.
     * @param body Body data.
     */
    private setScale(body: ISimpleBody): void {
        body.diameter.x *= Config.SIZE_RATIO
        body.diameter.y *= Config.SIZE_RATIO // TODO: Remove size ratio.

        if (body.orbit) {
            body.orbit.apocenter *= Config.SIZE_RATIO
            body.orbit.pericenter *= Config.SIZE_RATIO
        } else if(body.position) {
            body.position.distance *= Config.SIZE_RATIO
        }

        for (const ring of body.rings) {
            ring.diameter.max *= Config.SIZE_RATIO
            ring.diameter.min *= Config.SIZE_RATIO
        }
    }

    /**
     * Create renderer.
     * @returns WebGL renderer.
     */
    private createRenderer(): THREE.WebGLRenderer {
        const renderer = new THREE.WebGLRenderer({
            antialias: true, // TODO?
            logarithmicDepthBuffer: true
        })

        renderer.shadowMap.enabled = true // TODO?

        return renderer
    }
}

export default UniverseInitializer