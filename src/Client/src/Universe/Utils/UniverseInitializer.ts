import * as THREE from 'three'

const TrackballControls = require('three-trackballcontrols')

import Config from '../Constants/Config'
import BodyFactory from './BodyFactory'
import BodySelector from './BodySelector'

/**
 * Utils for universe.
 */
class UniverseInitializer implements IUniverseInitializer {

    public readonly element: HTMLElement
    public readonly bodies: IBodyContainer[]
    public readonly bodyFactory: IFactory<ISimpleBody, IBodyContainer>
    public readonly bodySelector: IBodySelector

    public readonly scene: THREE.Scene
    public readonly renderer: THREE.WebGLRenderer
    public readonly camera: THREE.PerspectiveCamera
    public readonly controls: THREE.TrackballControls
    public readonly frustum: THREE.Frustum
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
        this.camera = this.createCamera()
        this.controls = this.createControls()
        this.bodyFactory = new BodyFactory()
        this.scene.add(this.camera)
        element.appendChild(this.renderer.domElement)
        this.bodies = this.createBodies(bodies)
        this.bodySelector = new BodySelector(Object.values(this.bodies).map(body => body.mesh), this.camera)
        this.frustum = this.createFrustum()
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
     * Create camera.
     * @returns Perspective camera.
     */
    private createCamera(): THREE.PerspectiveCamera {
        const camera = new THREE.PerspectiveCamera(
            Config.CAMERA_FOV,
            window.innerWidth / window.innerHeight,
            Config.CAMERA_MIN_DISTANCE,
            Config.CAMERA_MAX_DISTANCE
        )

        camera.position.z = 1

        return camera
    }

    /**
     * Create controls.
     * @returns Trackball controls.
     */
    private createControls(): THREE.TrackballControls {
        const controls = new TrackballControls(this.camera)
        controls.maxDistance = Config.CAMERA_MAX_DISTANCE
        return controls
    }

    /**
     * Create frustum.
     * @returns THREE Frustum.
     */
    private createFrustum(): THREE.Frustum {
        return new THREE.Frustum()
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