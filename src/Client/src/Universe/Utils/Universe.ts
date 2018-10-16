import * as THREE from 'three'
import * as TWEEN from '@tweenjs/tween.js'

import Config from '../Constants/Config'
import UniverseInitializer from './UniverseInitializer'
import Visibility from '../Constants/Visibility'
import { Html } from '../../Utils'
import Camera from '../Utils/Camera'
import BodySelector from './BodySelector'

/**
 * Temp variables.
 */
const tempVector = new THREE.Vector3()
const meshPosition = new THREE.Vector3()

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
    private camera: ICamera

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
        this.camera = new Camera(this.scene, this.handleChangeViewSize)
        this.bodies = initializer.bodies
        this.bodySelector = new BodySelector(Object.values(this.bodies).map(body => body.mesh), this.camera.getNativeCamera())
        this.darkColor = initializer.darkColor
        this.lightColor = initializer.lightColor

        this.bodies.forEach(body => {
            body.label.onclick = () => this.handleSelectBody(body.data._id)
        })

        options.element.addEventListener('mousedown', this.handleClick)

        document.body.addEventListener('mousemove', event => {
            this.camera.enableControls(
                !Html.hasParent(
                    event.target as HTMLElement,
                    element => Html.hasClass(element, 'panel')
                )
            )
        })

        const selectedBodyId = this.bodies.filter(body => body.data.name === Config.INITIAL_BODY)[0].data._id
        this.handleSelectBody(selectedBodyId)

        this.resize()
        requestAnimationFrame(this.render)
    }

    public resize = (): void => {
        this.camera.setAspectRatio(window.innerWidth / window.innerHeight)
        this.renderer.setSize(window.innerWidth, window.innerHeight)
    }

    public setViewSize = (viewSize: number): void => {
        this.camera.setViewSize(viewSize)
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
    private render = (time: number): void => {
        requestAnimationFrame(this.render)
        this.renderer.render(this.scene, this.camera.getNativeCamera())
        this.updateBodies()
        TWEEN.update(time)
    }

    /**
     * Check if body is visible.
     * @param body Body.
     * @returns Body visibility.
     */
    private getVisibility(body: IBodyContainer): Visibility {
        body.mesh.getWorldPosition(meshPosition)

        const min = this.camera.getViewSize() / body.data.orbit.apocenter
        const distance = meshPosition.distanceTo(this.camera.getPosition())
        const max = this.camera.getViewSize() / distance

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
        this.setScale(this.camera.getViewSize() * this.scale)
        this.camera.update()

        for (const body of  this.bodies) {
            tempVector.setFromMatrixPosition(body.mesh.matrixWorld)
            const vector = tempVector.project(this.camera.getNativeCamera())
            const isVisible = this.camera.canSee(body.mesh)
            const orbit = body.orbit.children[0] as any
            const visibility = this.getVisibility(body)
            const isSelectedBody = body.data._id === this.camera.getTarget().name

            if (this.areLabelsVisible && (visibility === Visibility.VISIBLE && isVisible || isSelectedBody)) {
                vector.x = (vector.x + 1) / 2 * window.innerWidth
                vector.y = -(vector.y - 1) / 2 * window.innerHeight

                body.label.style.transform = 'translateX(' + vector.x + 'px) translateY(' + vector.y + 'px)'
            } else {
                body.label.style.transform = 'translateX(-1000px)'
            }

            orbit.material.opacity = visibility

            const orbitPoint = body.orbit.userData.path.getPoint(body.orbit.userData.angle)
            //body.orbit.userData.angle += (0.00001 * Math.PI * 2 * 365 * 24 * 60 / 1893415560) / (body.data.orbit.period || 1)

            if (visibility === Visibility.INVISIBLE && !isSelectedBody && body.data.name === 'Slunce') {
                body.mesh.position.set(0, 0, 0)
            } else {
                body.mesh.position.set(orbitPoint.x, orbitPoint.y, 0)
            }

            //body.mesh.rotateOnAxis(rotationVector, 0.001) // TODO: Only if rotate difference is bigger than 0.0001.
            //body.childrenContainer.rotateOnAxis(rotationVector, -0.001)
        }

        this.camera.setViewSizeLimit((this.camera.getTarget().geometry as THREE.SphereGeometry).parameters.radius * 2, Infinity)
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
        this.camera.setTarget(mesh)
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