import * as THREE from 'three'

import Config from '../Constants/Config'
import Visibility from '../Constants/Visibility'

import Scene from '../Utils/Scene'
import BodyFactory from './BodyFactory'
import Physics from '../../../../Utils/Physics'
import { Units } from '../../Utils'

/**
 * Temp variables.
 */
const tempVector = new THREE.Vector3()
const rotationVector = new THREE.Vector3(0, 0, 1)

interface IOptions {
    element: HTMLElement
    timeElement: HTMLElement
    bodies: Universis.Universe.Body.Simple[]
    onChangeViewSize: Universis.Consumer<number>
    onSelectBody: Universis.Consumer<string>
    viewSizeElement: HTMLElement
    timeSpeed?: number

    isNameVisible: boolean
    isLightVisible: boolean
    areOrbitsVisible: boolean
    isVelocityVisible: boolean
    isFromEarthVisible: boolean
    isFromCameraVisible: boolean
    isFromCenterVisible: boolean
}

class Universe implements Universis.Universe {

    /**
     * Instance of THREE.js scene.
     */
    private scene: Universis.Scene

    /**
     * List of all bodies in universe.
     */
    private bodies: Universis.Universe.Body.Container[]
    private rootBodies: THREE.Object3D[]

    /**
     * Scale of scene.
     */
    private scale: number = 0.000000001

    private element: HTMLElement
    private timeElement: HTMLElement

    /**
     * Simulation time.
     */
    private simulationTime: Date

    /**
     * Body container for our planet.
     */
    private earth: Universis.Universe.Body.Container

    /**
     * Current time speed.
     */
    private timeSpeed: number

    private isFromCameraVisible: boolean
    private isFromCenterVisible: boolean
    private isFromEarthVisible: boolean
    private isNameVisible: boolean
    private isVelocityVisible: boolean

    /**
     * Body factory.
     */
    private bodyFactory: Universis.Factory<Universis.Universe.Body.Simple, Universis.Universe.Body.Container>

    public constructor(options: IOptions) {
        this.bodyFactory = new BodyFactory()
        this.element = options.element
        this.timeElement = options.timeElement
        this.createBodies(options.bodies)
        this.earth = this.bodies.find(body => body.data.name === 'Země')
        this.timeSpeed = options.timeSpeed || 1
        this.simulationTime = new Date()

        this.scene = new Scene({
            backgroundColor: 0x000000,
            controllable: true,
            element: options.element,
            logarithmicDepth: true,
            objects: this.rootBodies,
            onRender: this.onRender,
            onChangeTarget: options.onSelectBody,
            onZoom: zoom => options.onChangeViewSize(zoom / Config.SIZE_RATIO),
            target: '5be60eee4143ef4fd8db9a77'
        })

        this.toggleName(options.isNameVisible)
        this.toggleFromCamera(options.isFromCameraVisible)
        this.toggleFromCenter(options.isFromCenterVisible)
        this.toggleFromEarth(options.isFromEarthVisible)
        this.toggleVelocity(options.isVelocityVisible)
        this.toggleLight(options.isLightVisible)
        this.toggleOrbits(options.areOrbitsVisible)
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

    public toggleLight(isLightVisible: boolean): void {
        this.scene.setAmbientColor(isLightVisible ? Config.LIGHT_COLOR : Config.DARK_COLOR)
    }

    public toggleOrbits(areOrbitsVisible: boolean): void {
        for (const body of this.bodies) {
            (body.orbit.children[0].children[0] as any).material.visible = areOrbitsVisible
        }
    }

    public setTimeSpeed(timeSpeed: number): void {
        this.timeSpeed = timeSpeed
    }

    public toggleFromCamera(isFromCameraVisible: boolean): void {
        this.isFromCameraVisible = isFromCameraVisible
    }

    public toggleFromCenter(isFromCenterVisible: boolean): void {
        this.isFromCenterVisible = isFromCenterVisible
    }

    public toggleFromEarth(isFromEarthVisible: boolean): void {
        this.isFromEarthVisible = isFromEarthVisible
    }

    public toggleName(isNameVisible: boolean): void {
        this.isNameVisible = isNameVisible
    }

    public toggleVelocity(isVelocityVisible: boolean): void {
        this.isVelocityVisible = isVelocityVisible
    }

    public toggleParticles(areParticlesVisible: boolean): void {
        for (const body of this.bodies) {
            if (body.data.type.particlesGenerator) {
                (body.mesh as THREE.Points).material.visible = areParticlesVisible
            }
        }
    }

    public setFollow(follow: number): void {
        this.scene.setFollow(follow)
    }

    /**
     * Update simmulation time.
     * @param {number} timeDiff
     */
    private updateTime(timeDiff: number): void {
        this.simulationTime.setTime(this.simulationTime.getTime() + timeDiff * this.timeSpeed)
        this.timeElement.textContent = this.simulationTime.toLocaleString()
    }

    /**
     * Update body.
     * @param body
     * @param timeDiff
     */
    private updateBody(body: Universis.Universe.Body.Container, timeDiff: number): void {
        const isVisible = this.scene.isInFov(body.mesh)
        const target = this.scene.getCameraTarget()
        const visibility = this.getVisibility(body)
        const isFullyRenderable = body.mesh === target || (isVisible && (visibility === Visibility.VISIBLE || (body.data.parentId && target.userData.parent && target.userData.parent.data._id === body.data._id)))

        const orbit = body.orbit.children[0].children[0] as any
        orbit.material.opacity = visibility

        if (body.data.orbit) {
            const position = Physics.getPosition(body.data, this.simulationTime.getTime())
            const orbitPoint = body.orbit.userData.path.getPoint(1 - position / (2 * Math.PI))

            if (body.mesh === target || visibility !== Visibility.INVISIBLE || (target.userData.parent && target.userData.parent.data._id === body.data._id)) {
                body.mesh.position.set(orbitPoint.x, orbitPoint.y, 0)
            }

            if (body.data.axis.period) {
                const angle = 2 * Math.PI * (Units.convert(Units.TIME.S, Units.TIME.D, this.timeSpeed / body.data.axis.period) / (1000 / timeDiff))
                body.mesh.rotateOnAxis(rotationVector, angle)
                body.childrenContainer.rotateOnAxis(rotationVector, -angle)
            }
        }

        isFullyRenderable ? this.updateLabel(body) : body.label.style.transform = 'translateX(-1000px)'
    }

    /**
     * Update position of all bodies.
     * @param timeDiff
     */
    private onRender = (timeDiff: number): void => {
        if (!this.scene) {
            return
        }

        this.updateTime(timeDiff)

        for (const body of  this.bodies) {
            this.updateBody(body, timeDiff)
        }
    }

    /**
     * Get label for body.
     * @param body
     * @returns Label.
     */
    private updateLabel(body: Universis.Universe.Body.Container): void {
        tempVector.setFromMatrixPosition(body.mesh.matrixWorld)
        const vector = this.scene.projectCamera(tempVector)
        vector.x = (vector.x + 1) / 2 * window.innerWidth
        vector.y = -(vector.y - 1) / 2 * window.innerHeight
        body.label.style.transform = 'translateX(' + vector.x + 'px) translateY(' + vector.y + 'px)'

        const fromEarth = this.scene.getDistance(body.mesh, this.earth.mesh)
        const fromCamera = this.scene.getDistance(body.mesh)
        const fromCenter = this.scene.getDistance(body.mesh, body.parent.mesh)
        const velocity = fromCenter ? Physics.getOrbitVelocity(body.data, body.parent.data, fromCenter) : null

        const rows = []
        if (this.isNameVisible) rows.push(body.data.name)
        if (this.isFromEarthVisible) rows.push(Units.toFull(fromEarth, Units.SIZE.KM, Units.SIZE))
        if (this.isFromCameraVisible) rows.push(Units.toFull(fromCamera, Units.SIZE.KM, Units.SIZE))

        if (fromCenter) {
            if (this.isFromCenterVisible) rows.push(Units.toFull(fromCenter, Units.SIZE.KM, Units.SIZE))
            if (this.isVelocityVisible) rows.push(Units.toFull(velocity, Units.VELOCITY.KM_S, Units.VELOCITY))
        }

        body.label.textContent = rows.join('\r\n')
    }

    /**
     * Convert size of bodies.
     * @param body Body data.
     */
    private setScale(body: Universis.Universe.Body.Simple): void {
        const convert = (value: number) => (
            value * Config.SIZE_RATIO
        )

        body.diameter.x = convert(body.diameter.x)
        body.diameter.y = convert(body.diameter.y)
        body.diameter.z = convert(body.diameter.z)

        if (body.orbit) {
            body.orbit.apsis = convert(body.orbit.apsis)
            body.orbit.periapsis = convert(body.orbit.periapsis)
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
    private getVisibility(body: Universis.Universe.Body.Container): Visibility {
        const viewSize = this.scene.getDistance(this.scene.getCameraTarget())
        const distance = this.scene.getDistance(body.mesh)
        const isTooLargeOrSmall = distance < body.data.diameter.x / 2 || distance > body.data.diameter.x * Config.INVISIBILITY_EDGE

        if (!body.data.orbit) {
            return isTooLargeOrSmall ? Visibility.INVISIBLE : Visibility.VISIBLE
        }

        const min = viewSize / body.data.orbit.apsis
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
    private createBodies(bodies: Universis.Universe.Body.Simple[]): void {
        this.bodies = []
        this.rootBodies = []

        for (const data of bodies) {
            this.setScale(data)

            const body = this.bodyFactory.create(data)
            this.bodies.push(body)
            this.element.appendChild(body.label)

            if (data.parentId) {
                body.parent = this.bodies.find(body => body.data._id === data.parentId)
                body.mesh.userData.parent = body.parent
                body.parent.mesh.children[0].add(body.orbit)
            } else {
                this.rootBodies.push(body.orbit)
            }
        }

        this.bodies.forEach(body => {
            body.label.onclick = () => this.scene.setCameraTarget(body.mesh)
        })
    }

}

export default Universe