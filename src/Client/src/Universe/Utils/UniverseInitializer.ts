import * as THREE from 'three'

import Config from '../Constants/Config'
import BodyFactory from './BodyFactory'
import BodySelector from './BodySelector'
import Camera from './Camera'

/**
 * Utils for universe.
 */
class UniverseInitializer implements IUniverseInitializer {

    public readonly element: HTMLElement
    public readonly bodies: IBodyContainer[]
    public readonly bodyFactory: IFactory<ISimpleBody, IBodyContainer>
    public readonly bodySelector: IBodySelector
    public readonly camera: ICamera

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
        this.scene = this.createScene()
        this.renderer = this.createRenderer()
        this.camera = new Camera()
        this.bodyFactory = new BodyFactory()
        element.appendChild(this.renderer.domElement)
        this.bodies = this.createBodies(bodies)
        this.bodySelector = new BodySelector(Object.values(this.bodies).map(body => body.mesh), this.camera.getNativeCamera())
        this.lightColor = this.createLightColor()
        this.darkColor = this.createDarkColor()
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
        body.diameter.equatorial *= Config.SIZE_RATIO
        body.diameter.polar *= Config.SIZE_RATIO
        body.orbit.apocenter *= Config.SIZE_RATIO
        body.orbit.pericenter *= Config.SIZE_RATIO

        for (const ring of body.rings) {
            ring.diameter.max *= Config.SIZE_RATIO
            ring.diameter.min *= Config.SIZE_RATIO
        }
    }

    /**
     * Create THREE.js scene.
     * @returns Scene.
     */
    private createScene(): THREE.Scene {
        return new THREE.Scene()
    }

    /**
     * Create renderer.
     * @returns WebGL renderer.
     */
    private createRenderer(): THREE.WebGLRenderer {
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            logarithmicDepthBuffer: true
        })

        renderer.shadowMap.enabled = true

        return renderer
    }

    /**
     * Create light color.
     * @returns Light color.
     */
    private createLightColor(): THREE.AmbientLight {
        return new THREE.AmbientLight(Config.LIGHT_COLOR)
    }

    /**
     * Create dark color.
     * @returns Dark color.
     */
    private createDarkColor(): THREE.AmbientLight {
        return new THREE.AmbientLight(Config.DARK_COLOR)
    }
}

export default UniverseInitializer