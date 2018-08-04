import * as THREE from 'three'

const TrackballControls = require('three-trackballcontrols')

import Config from '../Constants/Config'
import BodyFactory from './BodyFactory'
import BodySelector from './BodySelector'

/**
 * Temp variables.
 */
const tempVector = new THREE.Vector3()
const cameraPosition = new THREE.Vector3()
const bodyPosition = new THREE.Vector3()
const meshPosition = new THREE.Vector3()
const rotationVector = new THREE.Vector3(0, 0, 1)

/**
 * Utils for universe.
 */
class Universe implements IUniverse {

    /**
     * HTML element for THREE.js canvas.
     */
    private element: HTMLElement

    /**
     * List of all bodies in universe. Keys are ID of body.
     */
    private bodies: IObject<IBodyContainer>

    /**
     * Instance of factory for creating bodies.
     */
    private bodyFactory: IFactory<ISimpleBody, IBodyContainer>

    /**
     * Instance of class for select bodies by coordinates.
     */
    private bodySelector: IBodySelector

    /**
     * Current size ratio of scene.
     */
    private sizeRatio: number = 1

    /**
     * Current selected body.
     */
    private selectedBody: THREE.Mesh

    /**
     * THREE.js entities.
     */
    private scene: THREE.Scene
    private renderer: THREE.WebGLRenderer
    private camera: THREE.PerspectiveCamera
    private controls: THREE.TrackballControls

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

        element.addEventListener('mousedown', this.handleClick)

        this.scene.add(this.camera)
        element.appendChild(this.renderer.domElement)

        this.createBodies(bodies)
        this.selectBody(this.bodies['5b5db6c44ca9f558f163f2c7'].mesh)

        this.resize()
        this.render()
        this.bodySelector = new BodySelector(Object.values(this.bodies).map(body => body.mesh), this.camera)
    }

    public resize = (): void => {
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(window.innerWidth, window.innerHeight)
    }

    /**
     * Create bodies in universe and assign them to parents.
     * @param bodies List of all bodies.
     */
    private createBodies(bodies: ISimpleBody[]): void {
        this.bodies = {}

        for (const i in bodies) {
            const data = bodies[i]

            const body = this.bodyFactory.create(data)
            this.bodies[data._id] = body
            this.element.appendChild(body.label)
            body.label.onclick = () => this.selectBody(body.mesh)

            if (data.parentId) {
                this.scene.getObjectByName(data.parentId).children[0].add(body.orbit)
            } else {
                this.scene.add(body.orbit)
            }
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
        const controls = new TrackballControls(this.camera)
        controls.maxDistance = Config.CAMERA_MAX_DISTANCE
        return controls
    }

    /**
     * Render scene.
     */
    private render = (): void => {
        requestAnimationFrame(this.render)
        this.renderer.render(this.scene, this.camera)
        this.controls.update()
        this.updateBodies()
    }

    /**
     * Check if body is visible.
     * @param body Body.
     * @param zoom Current camera zoom.
     * @returns Body is visible.
     */
    private isVisible(body: IBodyContainer, zoom: number): boolean {
        const apocenter = body.data.orbit.apocenter * Config.SIZE_RATIO
        body.mesh.getWorldPosition(meshPosition)
        const distance = meshPosition.distanceTo(cameraPosition)

        const isTooLarge = distance > apocenter * Config.VISIBILITY_EDGE * this.sizeRatio
        const isTooSmall = zoom < apocenter / Config.VISIBILITY_EDGE * this.sizeRatio
        const isBehindCamera = Math.floor(tempVector.z) === 1
        const isSelectedBody = this.selectedBody.name === body.mesh.name

        return (!isBehindCamera && !isTooSmall && !isTooLarge) || isSelectedBody
    }

    /**
     * Update position of all bodies within render loop.
     */
    private updateBodies(): void {
        this.camera.getWorldPosition(cameraPosition)
        this.camera.parent.getWorldPosition(bodyPosition)
        const zoom = bodyPosition.distanceTo(cameraPosition)

        for (const i in this.bodies) {
            const body = this.bodies[i]

            tempVector.setFromMatrixPosition(body.mesh.matrixWorld)
            const vector = tempVector.project(this.camera)

            const orbitColor = (body.orbit.children[0] as any).material.color

            if (this.isVisible(body, zoom)) {
                orbitColor.setHex(Config.ORBIT_COLOR)

                vector.x = (vector.x + 1) / 2 * window.innerWidth
                vector.y = -(vector.y - 1) / 2 * window.innerHeight

                body.label.style.transform = 'translateX(' + vector.x + 'px) translateY(' + vector.y + 'px)'
            } else {
                orbitColor.setHex(Config.COLOR_ORBIT_INVISIBLE)
                body.label.style.transform = 'translateX(-1000px)'
            }

            const orbitPoint = body.orbit.userData.path.getPoint(body.orbit.userData.angle)
            body.orbit.userData.angle += 0.001 / body.data.orbit.period

            body.mesh.position.set(orbitPoint.x, orbitPoint.y, 0)

            body.mesh.rotateOnAxis(rotationVector, 0.01) // TODO: Only if rotate difference is bigger than 0.0001.
            body.childrenContainer.rotateOnAxis(rotationVector, -0.01)
        }

        this.checkChunk(zoom)
    }

    /**
     * Select body by coordinates.
     * @param  event Mouse event.
     */
    private handleClick = (event: MouseEvent): void => {
        const mesh = this.bodySelector.select(event.pageX, event.pageY)

        if (mesh) {
            this.selectBody(mesh)
        }
    }

    /**
     * Center body.
     * @param mesh THREE body.
     */
    private selectBody(mesh: THREE.Mesh): void {
        let position = new THREE.Vector3()
        position.setFromMatrixPosition(mesh.matrixWorld)
        this.controls.target.set(0, 0, 0)
        mesh.children[0].add(this.camera)
        this.selectedBody = mesh

        this.controls.minDistance = (mesh.geometry as THREE.SphereGeometry).parameters.radius * 2
    }


    /**
     * Universe is split into chunks, because of precision of numbers in JavaScript.
     * If scene is too small or too large, scale it.
     * @param zoom Distance of camera from centered body.
     */
    private checkChunk(zoom: number) {
        if (zoom > 1000000) {
            this.sizeRatio /= 1000
            this.scene.scale.setScalar(this.sizeRatio)
        }

        if (zoom < 1000) {
            this.sizeRatio *= 1000
            this.scene.scale.setScalar(this.sizeRatio)
        }
    }

}

export default Universe