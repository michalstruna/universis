import * as THREE from 'three'

const TrackballControls = require('three-trackballcontrols')

import Config from '../Constants/Config'
import BodyFactory from './BodyFactory'
import BodySelector from './BodySelector'

/**
 * Utils for universe.
 */
class UniverseInitializer implements IUniverseInitializer {

    private _element: HTMLElement
    private _bodies: IObject<IBodyContainer>
    private _bodyFactory: IFactory<ISimpleBody, IBodyContainer>
    private _bodySelector: IBodySelector

    private _scene: THREE.Scene
    private _renderer: THREE.WebGLRenderer
    private _camera: THREE.PerspectiveCamera
    private _controls: THREE.TrackballControls

    /**
     * Create universe.
     * @param element Target. There will be canvas with universe.
     * @param bodies List of all bodies.
     */
    public constructor(element: HTMLElement, bodies: ISimpleBody[]) {
        this._element = element
        this._scene = this.createScene()
        this._renderer = this.createRenderer()
        this._camera = this.createCamera()
        this._controls = this.createControls()
        this._bodyFactory = new BodyFactory()

        this._scene.add(this._camera)
        element.appendChild(this._renderer.domElement)

        this.createBodies(bodies)

        this._bodySelector = new BodySelector(Object.values(this._bodies).map(body => body.mesh), this._camera)
    }

    public get element(): HTMLElement {
        return this._element
    }

    public get bodies(): IObject<IBodyContainer> {
        return this._bodies
    }

    public get bodyFactory(): IFactory<ISimpleBody, IBodyContainer> {
        return this._bodyFactory
    }

    public get bodySelector(): IBodySelector {
        return this._bodySelector
    }

    public get scene(): THREE.Scene {
        return this._scene
    }

    public get renderer(): THREE.WebGLRenderer {
        return this._renderer
    }

    public get camera(): THREE.PerspectiveCamera {
        return this._camera
    }

    public get controls(): THREE.TrackballControls {
        return this._controls
    }

    /**
     * Create bodies in universe and assign them to parents.
     * @param bodies List of all bodies.
     */
    private createBodies(bodies: ISimpleBody[]): void {
        this._bodies = {}

        for (const i in bodies) {
            const data = bodies[i]

            this.setScale(data)

            const body = this._bodyFactory.create(data)
            this._bodies[data._id] = body
            this._element.appendChild(body.label)

            if (data.parentId) {
                this._scene.getObjectByName(data.parentId).children[0].add(body.orbit)
            } else {
                this._scene.add(body.orbit)
            }
        }
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
        const scene = new THREE.Scene()
        scene.add(new THREE.AmbientLight(Config.UNIVERSE_COLOR))
        return scene
    }

    /**
     * Create renderer.
     * @returns WebGL renderer.
     */
    private createRenderer(): THREE.WebGLRenderer {
        const renderer = new THREE.WebGLRenderer({
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

        camera.position.z = 5

        return camera
    }

    /**
     * Create controls.
     * @returns Trackball controls.
     */
    private createControls(): THREE.TrackballControls {
        const controls = new TrackballControls(this._camera)
        controls.maxDistance = Config.CAMERA_MAX_DISTANCE
        return controls
    }
}

export default UniverseInitializer