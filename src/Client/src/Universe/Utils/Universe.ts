import * as THREE from 'three'

import Config from '../Constants/Config'
import UniverseInitializer from './UniverseInitializer'
import Visibility from '../Constants/Visibility'

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
     * List of all bodies in universe. Keys are ID of body.
     */
    private bodies: IObject<IBodyContainer>

    /**
     * Instance of class for select bodies by coordinates.
     */
    private bodySelector: IBodySelector

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
        const initializer = new UniverseInitializer(element, bodies)

        this.scene = initializer.scene
        this.renderer = initializer.renderer
        this.camera = initializer.camera
        this.controls = initializer.controls
        this.bodies = initializer.bodies
        this.bodySelector = initializer.bodySelector

        for (const i in this.bodies) {
            const body = this.bodies[i]
            body.label.onclick = () => this.selectBody(body.mesh)
        }

        element.addEventListener('mousedown', this.handleClick)

        this.selectBody(this.bodies['5b5db6c44ca9f558f163f2c7'].mesh)

        this.resize()
        this.render()
    }

    public resize = (): void => {
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(window.innerWidth, window.innerHeight)
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
     * @param fromCenter Current camera zoom.
     * @returns Body visibility.
     */
    private getVisibility(body: IBodyContainer, fromCenter: number): Visibility {
        const apocenter = body.data.orbit.apocenter
        body.mesh.getWorldPosition(meshPosition)

        const isBehindCamera = Math.floor(tempVector.z) === 1
        const isSelectedBody = this.selectedBody.name === body.mesh.name


        if (isSelectedBody) {
            return Visibility.VISIBLE
        } else if (isBehindCamera) {
            return Visibility.INVISIBLE
        } else {
            const min = fromCenter / apocenter

            const distance = meshPosition.distanceTo(cameraPosition)
            const max = fromCenter / distance

            if (min > Config.INVISIBILITY_EDGE || max < (1 / Config.INVISIBILITY_EDGE)) {
                return Visibility.INVISIBLE
            } else if (min > Config.SEMI_VISIBILITY_EDGE || max < (1 / Config.SEMI_VISIBILITY_EDGE)) {
                return Visibility.SEMI_VISIBLE
            } else {
                return Visibility.VISIBLE
            }
        }


    }

    /**
     * Update position of all bodies within render loop.
     */
    private updateBodies(): void {
        this.camera.getWorldPosition(cameraPosition)
        this.camera.parent.getWorldPosition(bodyPosition)
        const fromCenter = bodyPosition.distanceTo(cameraPosition)

        for (const i in this.bodies) {
            const body = this.bodies[i]

            tempVector.setFromMatrixPosition(body.mesh.matrixWorld)
            const vector = tempVector.project(this.camera)

            const orbitColor = (body.orbit.children[0] as any).material.color

            const visibility = this.getVisibility(body, fromCenter)

            if (visibility === Visibility.VISIBLE) {
                orbitColor.setHex(Config.ORBIT_COLOR)

                vector.x = (vector.x + 1) / 2 * window.innerWidth
                vector.y = -(vector.y - 1) / 2 * window.innerHeight

                body.label.style.transform = 'translateX(' + vector.x + 'px) translateY(' + vector.y + 'px)'
            } else if (visibility === Visibility.SEMI_VISIBLE) {
                orbitColor.setHex(Config.ORBIT_COLOR_SEMI_VISIBLE)
                body.label.style.transform = 'translateX(-1000px)'
            } else {
                orbitColor.setHex(Config.ORBIT_COLOR_INVISIBLE)
                body.label.style.transform = 'translateX(-1000px)'
            }

            const orbitPoint = body.orbit.userData.path.getPoint(body.orbit.userData.angle)
            body.orbit.userData.angle += 0.001 / body.data.orbit.period

            body.mesh.position.set(orbitPoint.x, orbitPoint.y, 0)

            body.mesh.rotateOnAxis(rotationVector, 0.01) // TODO: Only if rotate difference is bigger than 0.0001.
            body.childrenContainer.rotateOnAxis(rotationVector, -0.01)
        }
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

}

export default Universe