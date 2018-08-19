import * as THREE from 'three'

import Config from '../Constants/Config'
import UniverseInitializer from './UniverseInitializer'
import Visibility from '../Constants/Visibility'
import Units from './Units'

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
    private onChangeViewSize: IConsumer<number>

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
        const initializer = new UniverseInitializer(element, bodies)
        this.scale = 1

        this.scene = initializer.scene
        this.renderer = initializer.renderer
        this.camera = initializer.camera
        this.controls = initializer.controls
        this.frustum = initializer.frustum
        this.bodies = initializer.bodies
        this.bodySelector = initializer.bodySelector

        this.bodies.forEach(body => {
            body.label.onclick = () => this.selectBody(body.mesh)
        })

        element.addEventListener('mousedown', this.handleClick)

        this.selectBody(this.bodies[3].mesh)

        this.resize()
        this.render()
    }

    public resize = (): void => {
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(window.innerWidth, window.innerHeight)
    }

    public setViewSize(viewSize: number): void {
        this.camera.position.set(0, 0, viewSize * Config.SIZE_RATIO) // TODO: Easing and direction.
        lastViewSize = viewSize
    }

    public setOnChangeViewSize(callback: IConsumer<number>): void {
        this.onChangeViewSize = callback
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

        if (Units.isDifferent(viewSize, lastViewSize) && this.onChangeViewSize) {
            lastViewSize = viewSize
            this.onChangeViewSize(viewSize / Config.SIZE_RATIO)
        }

        this.camera.matrixWorldInverse.getInverse(this.camera.matrixWorld)
        cameraViewProjectionMatrix.multiplyMatrices(this.camera.projectionMatrix, this.camera.matrixWorldInverse)
        this.frustum.setFromMatrix(cameraViewProjectionMatrix)

        this.setScale(viewSize * this.scale)

        for (const body of  this.bodies) {
            tempVector.setFromMatrixPosition(body.mesh.matrixWorld)
            const vector = tempVector.project(this.camera)
            const isBehindCamera = !this.frustum.intersectsObject(body.mesh)
            const orbitColor = (body.orbit.children[0] as any).material.color
            const visibility = this.getVisibility(body, viewSize)
            const isSelectedBody = body.data._id === this.selectedBody.name

            if (visibility === Visibility.VISIBLE && !isBehindCamera || isSelectedBody) {
                vector.x = (vector.x + 1) / 2 * window.innerWidth
                vector.y = -(vector.y - 1) / 2 * window.innerHeight

                body.label.style.transform = 'translateX(' + vector.x + 'px) translateY(' + vector.y + 'px)'
            } else {
                body.label.style.transform = 'translateX(-1000px)'
            }

            orbitColor.setHex(visibility)

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
    }

    /**
     * Select body by coordinates.
     * @param event Mouse event.
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
        this.selectedBody = mesh
        this.controls.minDistance = (mesh.geometry as THREE.SphereGeometry).parameters.radius * 2

        mesh.children[0].add(this.camera)
        this.controls.target.set(0, 0, 0)
    }

    /**
     * Universe is split into chunks, because of precision of numbers in JavaScript.
     * If scene is too small or too large, scale it.
     * @param viewSize Distance camera from centered body.
     */
    private setScale(viewSize: number): void {
        if (viewSize > 1000000) {
            this.scale /= 1000
        } else if (viewSize < 1000) {
            this.scale *= 1000
        }
    }

}

export default Universe