import * as THREE from 'three'

import { Html, Units } from '../../Utils'
import Follow from '../Constants/Follow'
import { Vector3 } from 'three'

const TrackballControls = require('three-trackballcontrols')

const DEFAULT_OPTIONS = {
    ambientColor: 0x000000,
    backgroundColor: null,
    cameraDistance: 1,
    far: 1e50,
    follow: Follow.MOVE,
    fov: 50,
    height: window.innerHeight,
    globalCamera: false,
    logarithmicDepth: false,
    maxDistance: Infinity,
    near: 1e-3,
    objects: [],
    width: window.innerWidth
}

let tempObject1Position = new THREE.Vector3()
let tempObject2Position = new THREE.Vector3()
var cameraViewProjectionMatrix = new THREE.Matrix4()
const ZERO_VECTOR = new THREE.Vector3(0, 0, 0)

/**
 * Utils for THREE.js scene.
 */
class Scene implements Universis.Scene {

    /**
     * Scene options.
     */
    private options: Universis.Scene.Options

    /**
     * Camera target.
     */
    private target: THREE.Mesh

    /**
     * List of all named meshes in scene.
     */
    private namedMeshes: THREE.Mesh[]

    /**
     * Last timestamp of onRender callback.
     */
    private lastOnRenderTime: number

    /**
     * THREE.js entities.
     */
    private scene: THREE.Scene
    private camera: THREE.PerspectiveCamera
    private renderer: THREE.WebGLRenderer
    private ambientLight: THREE.AmbientLight
    private frustum: THREE.Frustum
    private controls: THREE.TrackballControls
    private rayCaster: THREE.Raycaster

    private lastDistanceFromTarget: number

    private startMouseX: number
    private startMouseY: number

    constructor(options: Universis.Scene.Options) {
        this.options = {
            ...DEFAULT_OPTIONS,
            ...options
        }

        this.lastOnRenderTime = new Date().getTime()
        this.namedMeshes = []

        this.createScene()
        this.createCamera()
        this.createRenderer()
        this.createAmbientLight()
        this.createObjects()
        this.createFrustum()

        if (this.options.controllable) {
            this.createControls()
            this.createRayCaster()
            this.bindEvents()
        }

        this.setInitialTarget()

        this.append()
        this.render()
        this.resize()

        this.setCameraDistance(this.options.cameraDistance)
    }

    public getCameraTarget(): THREE.Mesh {
        return this.target
    }

    public getDistance(object1: THREE.Object3D, object2: THREE.Object3D = this.camera): number {
        object1.getWorldPosition(tempObject1Position)
        object2.getWorldPosition(tempObject2Position)
        return tempObject1Position.distanceTo(tempObject2Position)
    }

    public isInFov(object: THREE.Object3D): boolean {
        if (!('geometry' in object)) {
            return false // TODO
        }

        this.camera.updateMatrixWorld(false)
        this.camera.matrixWorldInverse.getInverse(this.camera.matrixWorld)
        cameraViewProjectionMatrix.multiplyMatrices(this.camera.projectionMatrix, this.camera.matrixWorldInverse)
        this.frustum.setFromMatrix(cameraViewProjectionMatrix)

        return this.frustum.intersectsObject(object)
    }

    public projectCamera(vector: THREE.Vector3): THREE.Vector3 {
        return vector.project(this.camera)
    }

    public resize(width: number = this.options.width, height: number = this.options.height): void {
        this.camera.aspect = width / height
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(width, height)
    }

    public setAmbientColor(color: number): void {
        this.ambientLight.color.setHex(color)
    }

    public setControllable(isControllable: boolean): void {
        if (isControllable) {
            if (!this.controls) {
                this.createControls()
            }

            if (!this.rayCaster) {
                this.createRayCaster()
            }
        }

        this.controls.enabled = isControllable
    }

    public setCameraTarget(objectId: string | THREE.Mesh): void {
        const { controllable, follow, onChangeTarget } = this.options
        const oldTarget = this.target
        this.target = (typeof objectId === 'string' ? this.scene.getObjectByName(objectId) : objectId) as any

        if (follow === Follow.MOVE) {
            this.target.children[0].add(this.camera)

            if (this.controls) {
                this.controls.target = ZERO_VECTOR
            } else {
                this.camera.lookAt(ZERO_VECTOR)
            }
        } else if (follow === Follow.MOVE_AND_ROTATION) {
            this.target.add(this.camera)

            if (this.controls) {
                this.controls.target = ZERO_VECTOR
            } else {
                this.camera.lookAt(ZERO_VECTOR)
            }
        } else {
            const newCameraPosition = new Vector3()
            newCameraPosition.copy(this.camera.position)
            newCameraPosition.add(this.target.position)

            this.target.parent.add(this.camera)
            this.camera.position.copy(newCameraPosition)

            if (this.controls) {
                this.controls.target = this.target.position
            } else {
                this.camera.lookAt(this.target.position)
            }
        }

        if (oldTarget !== this.target) {
            const targetSize = this.getTargetSize()

            if (controllable && targetSize) {
                this.controls.minDistance = targetSize
            }

            this.setCameraDistance(targetSize)
        }

        if (onChangeTarget) {
            onChangeTarget(this.target.name)
        }
    }

    public setCameraDistance(distance: number): void {
        this.camera.position.normalize().multiplyScalar(distance)
    }

    public getCameraPosition(): THREE.Vector3 {
        return this.camera.position
    }

    public setFollow(follow: number): void {
        this.options.follow = follow
        this.setCameraTarget(this.target)
    }

    /**
     * Create THREE.js scene.
     */
    private createScene(): void {
        this.scene = new THREE.Scene()
    }

    /**
     * Create THREE.js perspective camera.
     */
    private createCamera(): void {
        const { far, fov, height, near, width } = this.options
        this.camera = new THREE.PerspectiveCamera(fov, width / height, near, far)
        this.camera.position.z = 1
        this.scene.add(this.camera)
    }

    /**
     * Create WebGL renderer.
     */
    private createRenderer(): void {
        const { backgroundColor, height, logarithmicDepth, width } = this.options

        this.renderer = new THREE.WebGLRenderer({
            alpha: backgroundColor === null,
            clearAlpha: (backgroundColor !== null) ? 1 : 0,
            clearColor: (backgroundColor !== null) ? backgroundColor : null,
            logarithmicDepthBuffer: logarithmicDepth
        })

        this.renderer.setSize(width, height)
    }

    /**
     * Create ambient light.
     */
    private createAmbientLight(): void {
        const { ambientColor } = this.options
        this.ambientLight = new THREE.AmbientLight(ambientColor)
        this.scene.add(this.ambientLight)
    }

    /**
     * Add objects with name to scene.
     */
    private createObjects(): void {
        const { objects } = this.options

        const recursivelyAddMeshes = (objects: THREE.Object3D[]) => {
            for (const object of objects) {
                if (object.name) {
                    this.namedMeshes.push(object as THREE.Mesh)
                }

                recursivelyAddMeshes(object.children)
            }
        }

        for (const object of objects) {
            this.scene.add(object)
        }

        recursivelyAddMeshes(objects)
    }

    /**
     * Create three frustum.
     */
    private createFrustum(): void {
        this.frustum = new THREE.Frustum()
    }

    /**
     * Create trackball controls.
     */
    private createControls(): void {
        this.controls = new TrackballControls(this.camera)
        this.controls.maxDistance = this.options.maxDistance
    }

    /**
     * Create ray caster.
     */
    private createRayCaster(): void {
        this.rayCaster = new THREE.Raycaster()
    }

    /**
     * Append canvas to HTML element.
     */
    private append(): void {
        const { element } = this.options
        element.appendChild(this.renderer.domElement)
    }

    /**
     * Render loop.
     */
    private render = (): void => {
        const { controllable, onRender, onZoom } = this.options
        requestAnimationFrame(this.render)
        this.renderer.render(this.scene, this.camera)
        this.updateCamera()
        const now = new Date().getTime()

        if (onRender && this.lastOnRenderTime < now) {
            onRender(now - this.lastOnRenderTime)
            this.lastOnRenderTime = now
        }

        if (controllable) {
            const fromCenter = this.getDistance(this.target, this.camera)
            const isDifferent = !this.lastDistanceFromTarget || Units.isDifferent(fromCenter, this.lastDistanceFromTarget)

            if (onZoom && isDifferent) {
                this.lastDistanceFromTarget = fromCenter
                onZoom(fromCenter)
            }
        }
    }

    private updateCamera(): void {
        if (this.controls) {
            this.controls.update()
        }
    }

    /**
     * Select body by coordinates on screen.
     * @param x Horizontal coordinate.
     * @param y Vertical coordinate.
     * @return Selected body or null.
     */
    private select = (x: number, y: number): THREE.Mesh => {
        const coordinates = {
            x: (x / window.innerWidth) * 2 - 1,
            y: -(y / window.innerHeight) * 2 + 1
        }

        this.rayCaster.setFromCamera(coordinates, this.camera)
        const intersects = this.rayCaster.intersectObjects(this.namedMeshes)

        return intersects[0] ? (intersects[0].object as THREE.Mesh) : null
    }

    /**
     * Get size of target mesh.
     */
    private getTargetSize(): number {
        const geometry = this.target.geometry as any

        if (geometry && geometry.parameters && geometry.parameters.radius) {
            return geometry.parameters.radius * 2
        }

        return 1
    }

    /**
     * Bind UI events to scene.
     */
    private bindEvents(): void {
        const { element } = this.options

        element.addEventListener('mousedown', this.handleMouseDown)
        element.addEventListener('mouseup', this.handleMouseUp)

        document.body.addEventListener('mousemove', event => {
            this.controls.enabled = (
                !Html.hasParent(
                    event.target as HTMLElement,
                    element => Html.hasClass(element, 'panel') || Html.hasClass(element, 'control')
                )
            )
        })
    }

    /**
     * Save mouse coordinates.
     * @param event Mouse event.
     */
    private handleMouseDown = (event: MouseEvent): void => {
        this.startMouseX = event.pageX
        this.startMouseY = event.pageY
    }

    /**
     * Select body by coordinates.
     * @param event Mouse event.
     */
    private handleMouseUp = (event: MouseEvent): void => {
        if (event.pageX === this.startMouseX && event.pageY === this.startMouseY) {
            const mesh = this.select(event.pageX, event.pageY)

            if (mesh) {
                this.setCameraTarget(mesh)
            }
        }
    }

    /**
     * Set initial target of camera. If not specified, set first named mesh in scene.
     */
    private setInitialTarget(): void {
        const target = this.options.target || this.namedMeshes[0]

        if (target) {
            this.setCameraTarget(target)
        }
    }

}

export default Scene