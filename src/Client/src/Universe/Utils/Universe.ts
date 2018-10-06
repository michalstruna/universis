import * as THREE from 'three'

import Config from '../Constants/Config'
import UniverseInitializer from './UniverseInitializer'
import Visibility from '../Constants/Visibility'
import Units from './Units'
import { Html } from '../../Utils'

/**
 * Temp variables.
 */
const tempVector = new THREE.Vector3()
const cameraPosition = new THREE.Vector3()
const bodyPosition = new THREE.Vector3()
const meshPosition = new THREE.Vector3()
const rotationVector = new THREE.Vector3(0, 0, 1)
const cameraViewProjectionMatrix = new THREE.Matrix4()
let lastViewSize = null

interface IOptions {
    element: HTMLElement
    bodies: ISimpleBody[]
    onChangeViewSize: IConsumer<number>
    onSelectBody: IConsumer<string>
}

/**
 * Utils for universe.
 */
class Universe implements IUniverse {

    /**
     * List of all bodies in universe.
     */
    private bodies: IBodyContainer[]

    /**
     * Instance of class for select bodies by coordinates.
     */
    private bodySelector: IBodySelector

    /**
     * Current selected body.
     */
    private selectedBody: THREE.Mesh

    /**
     * Helper for decide if body is on camera or not.
     */
    private frustum: THREE.Frustum

    /**
     * Scale of scene.
     */
    private scale: number

    /**
     * Handlers.
     */
    private handleChangeViewSize: IConsumer<number>
    private handleSelectBody: IConsumer<string>

    /**
     * THREE.js entities.
     */
    private scene: THREE.Scene
    private renderer: THREE.WebGLRenderer
    private camera: THREE.PerspectiveCamera
    private controls: THREE.TrackballControls

    /**
     * Toggle values.
     */
    private areLabelsVisible: boolean
    private darkColor: THREE.AmbientLight
    private lightColor: THREE.AmbientLight

    /**
     * Create universe.
     * @param options Options.
     */
    public constructor(options: IOptions) {
        const initializer = new UniverseInitializer(options.element, options.bodies)
        this.scale = 1

        this.handleSelectBody = options.onSelectBody
        this.handleChangeViewSize = options.onChangeViewSize

        this.scene = initializer.scene
        this.renderer = initializer.renderer
        this.camera = initializer.camera
        this.controls = initializer.controls
        this.frustum = initializer.frustum
        this.bodies = initializer.bodies
        this.bodySelector = initializer.bodySelector
        this.darkColor = initializer.darkColor
        this.lightColor = initializer.lightColor

        this.bodies.forEach(body => {
            body.label.onclick = () => this.handleSelectBody(body.data._id)
        })

        options.element.addEventListener('mousedown', this.handleClick)

        document.body.addEventListener('mousemove', event => {
            this.controls.enabled = !Html.hasParent(event.target as HTMLElement, element => Html.hasClass(element, 'panel'))
        })

        const selectedBodyId = this.bodies.filter(body => body.data.name === Config.INITIAL_BODY)[0].data._id
        this.selectBody(selectedBodyId)
        this.handleSelectBody(selectedBodyId)

        this.resize()
        this.render()
    }

    public resize = (): void => {
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(window.innerWidth, window.innerHeight)
    }

    public setViewSize = (viewSize: number): void => {
        viewSize *= Config.SIZE_RATIO
        this.controls.minDistance = Math.max(viewSize, this.controls.minDistance)
        this.controls.maxDistance = viewSize
        lastViewSize = viewSize
        this.camera.updateProjectionMatrix()
    }

    public toggleLabels(areLabelsVisible: boolean) {
        this.areLabelsVisible = areLabelsVisible
    }

    public toggleLight(isLightVisible: boolean) {
        if (isLightVisible) {
            this.scene.remove(this.darkColor)
            this.scene.add(this.lightColor)
        } else {
            this.scene.remove(this.lightColor)
            this.scene.add(this.darkColor)
        }
    }

    public toggleOrbits(areOrbitsVisible: boolean) {
        for (const body of this.bodies) {
            (body.orbit.children[0] as any).material.visible = areOrbitsVisible
        }
    }

    /**
     * Get body from collection.
     * @param bodyId ID of body.
     * @returns Body container with this ID.
     */
    private getBodyById(bodyId: string): IBodyContainer {
        return this.bodies.filter(body => body.data._id === bodyId)[0]
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
     * @param viewSize Current camera zoom.
     * @returns Body visibility.
     */
    private getVisibility(body: IBodyContainer, viewSize: number): Visibility {
        const apocenter = body.data.orbit.apocenter
        body.mesh.getWorldPosition(meshPosition)

        const min = viewSize / apocenter
        const distance = meshPosition.distanceTo(cameraPosition)
        const max = viewSize / distance

        if (min > Config.INVISIBILITY_EDGE || Math.min(max, min) < (1 / Config.INVISIBILITY_EDGE)) {
            return Visibility.INVISIBLE
        } else if (min > Config.SEMI_VISIBILITY_EDGE || Math.min(max, min) < (1 / Config.SEMI_VISIBILITY_EDGE)) {
            return Visibility.SEMI_VISIBLE
        } else {
            return Visibility.VISIBLE
        }
    }

    /**
     * Update position of all bodies within render loop.
     */
    private updateBodies(): void {
        this.camera.getWorldPosition(cameraPosition)
        this.selectedBody.getWorldPosition(bodyPosition)
        const viewSize = bodyPosition.distanceTo(cameraPosition)

        if (Units.isDifferent(viewSize, lastViewSize) && this.handleChangeViewSize) {
            lastViewSize = viewSize
            this.handleChangeViewSize(viewSize / Config.SIZE_RATIO)
        }

        this.camera.matrixWorldInverse.getInverse(this.camera.matrixWorld)
        cameraViewProjectionMatrix.multiplyMatrices(this.camera.projectionMatrix, this.camera.matrixWorldInverse)
        this.frustum.setFromMatrix(cameraViewProjectionMatrix)

        this.setScale(viewSize * this.scale)

        for (const body of  this.bodies) {
            tempVector.setFromMatrixPosition(body.mesh.matrixWorld)
            const vector = tempVector.project(this.camera)
            const isBehindCamera = !this.frustum.intersectsObject(body.mesh)
            const orbit = body.orbit.children[0] as any
            const visibility = this.getVisibility(body, viewSize)
            const isSelectedBody = body.data._id === this.selectedBody.name

            if (this.areLabelsVisible && (visibility === Visibility.VISIBLE && !isBehindCamera || isSelectedBody)) {
                vector.x = (vector.x + 1) / 2 * window.innerWidth
                vector.y = -(vector.y - 1) / 2 * window.innerHeight

                body.label.style.transform = 'translateX(' + vector.x + 'px) translateY(' + vector.y + 'px)'
            } else {
                body.label.style.transform = 'translateX(-1000px)'
            }

            orbit.material.opacity = visibility

            const orbitPoint = body.orbit.userData.path.getPoint(body.orbit.userData.angle)
            body.orbit.userData.angle += (0.00001 * Math.PI * 2 * 365 * 24 * 60 / 1893415560) / (body.data.orbit.period || 1)

            if (visibility === Visibility.INVISIBLE && !isSelectedBody && body.data.name === 'Slunce') {
                body.mesh.position.set(0, 0, 0)
            } else {
                body.mesh.position.set(orbitPoint.x, orbitPoint.y, 0)
            }

            body.mesh.rotateOnAxis(rotationVector, 0.001) // TODO: Only if rotate difference is bigger than 0.0001.
            body.childrenContainer.rotateOnAxis(rotationVector, -0.001)
        }

        this.controls.minDistance = (this.selectedBody.geometry as THREE.SphereGeometry).parameters.radius * 2
        this.controls.maxDistance = Infinity
    }

    /**
     * Select body by coordinates.
     * @param event Mouse event.
     */
    private handleClick = (event: MouseEvent): void => {
        const mesh = this.bodySelector.select(event.pageX, event.pageY)

        if (mesh) {
            this.handleSelectBody(mesh.name)
        }
    }

    /**
     * Center body.
     * @param bodyId ID of body.
     */
    public selectBody(bodyId: string): void {
        const mesh = this.getBodyById(bodyId).mesh
        this.selectedBody = mesh
        const radius = (mesh.geometry as THREE.SphereGeometry).parameters.radius
        this.controls.minDistance = radius * 2
        this.controls.maxDistance = radius * 4

        mesh.children[0].add(this.camera)
        this.controls.target.set(0, 0, 0)
    }

    /**
     * Universe is split into chunks, because of precision of numbers in JavaScript.
     * If scene is too small or too large, scale it.
     * @param viewSize Distance camera from centered body.
     */
    private setScale(viewSize: number): void {
        if (viewSize > 1e6) {
            this.scale /= 1e3
        } else if (viewSize < 1e3) {
            this.scale *= 1e3
        }
    }

}

export default Universe