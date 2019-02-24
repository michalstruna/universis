import * as THREE from 'three'

import Config from '../Constants/Config'
import Visibility from '../Constants/Visibility'

import Scene from '../Utils/Scene'
import BodyFactory from './BodyFactory'

/**
 * Temp variables.
 */
const tempVector = new THREE.Vector3()
const rotationVector = new THREE.Vector3(0, 0, 1)

interface IOptions {
    element: HTMLElement
    timeElement: HTMLElement
    bodies: ISimpleBody[]
    onChangeViewSize: IConsumer<number>
    onSelectBody: IConsumer<string>
    viewSizeElement: HTMLElement
}

class Universe implements IUniverse {

    /**
     * Instance of THREE.js scene.
     */
    private scene: IScene

    /**
     * List of all bodies in universe.
     */
    private bodies: IBodyContainer[]
    private rootBodies: THREE.Object3D[]

    /**
     * Visibility of labels.
     */
    private areLabelsVisible: boolean

    /**
     * Scale of scene.
     */
    private scale: number

    private element: HTMLElement
    private timeElement: HTMLElement

    /**
     * Simulation time [ms].
     */
    private simulationTime: number

    /**
     * Body factory.
     */
    private bodyFactory: IFactory<ISimpleBody, IBodyContainer>

    public constructor(options: IOptions) {
        this.bodyFactory = new BodyFactory()
        this.element = options.element
        this.timeElement = options.timeElement
        this.createBodies(options.bodies)
        this.simulationTime = new Date().getTime()

        this.scene = new Scene({
            backgroundColor: 0x000000,
            controllable: true,
            element: options.element,
            logarithmicDepth: true,
            objects: this.rootBodies,
            onRender: () => this.updateBodies(),
            onRenderInterval: Config.RENDER_INTERVAL,
            onZoom: zoom => options.onChangeViewSize(zoom / Config.SIZE_RATIO),
            target: '5be60eee4143ef4fd8db9a77'
        })
    }

    public resize = (): void => {
        this.scene.resize(window.innerWidth, window.innerHeight)
    }

    public selectBody(bodyId: string): void {
        this.scene.setCameraTarget(bodyId)
    }

    public setViewSize = (viewSize: number): void => {
        this.scene.setCameraDistance(viewSize * Config.SIZE_RATIO)
    }

    public toggleLabels(areLabelsVisible: boolean): void {
        this.areLabelsVisible = areLabelsVisible
    }

    public toggleLight(isLightVisible: boolean): void {
        this.scene.setAmbientColor(isLightVisible ? Config.LIGHT_COLOR : Config.DARK_COLOR)
    }

    public toggleOrbits(areOrbitsVisible: boolean): void {
        for (const body of this.bodies) {
            (body.orbit.children[0] as any).material.visible = areOrbitsVisible
        }
    }

    /**
     * Update position of all bodies within render loop.
     */
    private updateBodies = (): void => {
        if (!this.scene) {
            return
        }

        this.updateScale(this.scene.getDistanceFromCamera() * this.scale)
        this.simulationTime += Config.RENDER_INTERVAL
        this.timeElement.textContent = new Date(this.simulationTime).toLocaleString()

        for (const body of  this.bodies) {
            tempVector.setFromMatrixPosition(body.mesh.matrixWorld)
            const vector = this.scene.projectCamera(tempVector)
            const isVisible = this.scene.isInFov(body.mesh)
            const orbit = body.orbit.children[0] as any
            const visibility = body.data.orbit ? this.getVisibility(body) : Visibility.INVISIBLE
            const isSelectedBody = body.data._id === this.scene.getCameraTarget().name

            if (this.areLabelsVisible && (visibility === Visibility.VISIBLE && isVisible || isSelectedBody)) {
                vector.x = (vector.x + 1) / 2 * window.innerWidth
                vector.y = -(vector.y - 1) / 2 * window.innerHeight

                body.label.style.transform = 'translateX(' + vector.x + 'px) translateY(' + vector.y + 'px)'
            } else {
                body.label.style.transform = 'translateX(-1000px)'
            }

            orbit.material.opacity = visibility

            if (body.data.orbit) {
                const orbitPoint = body.orbit.userData.path.getPoint(body.orbit.userData.angle)
                body.orbit.userData.angle += body.data.temp.anglePerCycle * 25// * 31556926

                if (visibility === Visibility.INVISIBLE && !isSelectedBody && body.data.name === 'Slunce') {
                    body.mesh.position.set(0, 0, 0)
                } else {
                    body.mesh.position.set(orbitPoint.x, orbitPoint.y, 0)
                }

                body.mesh.rotateOnAxis(rotationVector, 0.001) // TODO: Only if rotate difference is bigger than 0.0001.
                body.childrenContainer.rotateOnAxis(rotationVector, -0.001)
            }
        }

    }

    /**
     * Universe is split into chunks, because of precision of numbers in JavaScript.
     * If scene is too small or too large, scale it.
     * @param viewSize Distance camera from centered body.
     */

    private updateScale(viewSize: number): void {
        if (viewSize > 1e6) {
            this.scale /= 1e3
        } else if (viewSize < 1e3) {
            this.scale *= 1e3
        }
    }

    /**
     * Convert size of bodies.
     * @param body Body data.
     */
    private setScale(body: ISimpleBody): void {
        const convert = (value: number) => (
            value * Config.SIZE_RATIO
        )

        body.diameter.x = convert(body.diameter.x)
        body.diameter.y = convert(body.diameter.y)
        body.diameter.z = convert(body.diameter.z)

        if (body.orbit) {
            body.orbit.apocenter = convert(body.orbit.apocenter)
            body.orbit.pericenter = convert(body.orbit.pericenter)
        } else if (body.position) {
            body.position.distance = convert(body.position.distance)
        }

        for (const ring of body.rings) {
            ring.diameter.max = convert(ring.diameter.max)
            ring.diameter.min = convert(ring.diameter.min)
        }
    }

    /**
     * Check if body is visible.
     * @param body Body.
     * @returns Body visibility.
     */
    private getVisibility(body: IBodyContainer): Visibility {
        const viewSize = this.scene.getDistanceFromCamera()

        const min = viewSize / body.data.orbit.apocenter
        const distance = this.scene.getDistanceFromCamera(body.mesh)
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
     * Create bodies in universe and assign them to parents.
     * @param bodies List of all bodies.
     */
    private createBodies(bodies: ISimpleBody[]): void {
        this.bodies = []
        this.rootBodies = []

        for (const data of bodies) {
            this.setScale(data)

            const body = this.bodyFactory.create(data)
            this.bodies.push(body)
            this.element.appendChild(body.label)

            if (data.parentId) {
                this.bodies.filter(body => body.data._id === data.parentId)[0].mesh.add(body.orbit)
                //this.scene.getObject(data.parentId).children[0].add(body.orbit)
            } else {
                this.rootBodies.push(body.orbit)
                //this.scene.addObject(body.orbit)
            }
        }

        this.bodies.forEach(body => {
            body.label.onclick = () => this.scene.setCameraTarget(body.mesh)
        })
    }

}

export default Universe