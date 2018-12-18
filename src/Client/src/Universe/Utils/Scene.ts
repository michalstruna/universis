import * as THREE from 'three'

const TrackballControls = require('three-trackballcontrols')

const DEFAULT_OPTIONS = {
    ambientColor: 0x000000,
    backgroundColor: null,
    cameraPosition: { z: 1 },
    far: 1e50,
    fov: 75,
    height: window.innerHeight,
    logarithmicDepth: false,
    maxDistance: Infinity,
    near: 1e-3,
    objects: [],
    width: window.innerWidth
}

let tempObjectPosition = new THREE.Vector3()
let tempCameraPosition = new THREE.Vector3()
let tempViewProjection = new THREE.Matrix4()

/**
 * Utils for THREE.js scene.
 */
class Scene implements IScene {

    /**
     * Scene options.
     */
    private options: ISceneOptions

    /**
     * Camera target.
     */
    private target: THREE.Mesh

    /**
     * List of all named meshes in scene.
     */
    private namedMeshes: THREE.Mesh[]

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

    constructor(options: ISceneOptions) {
        this.options = {
            ...DEFAULT_OPTIONS,
            ...options
        }

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

        if (this.options.target) {
            this.setCameraTarget(this.options.target)
        }

        this.append()
        this.render()
        this.resize()
    }

    public getCameraTarget(): THREE.Mesh {
        return this.target
    }

    public getDistanceFromCamera(object: THREE.Mesh = this.target): number {
        object.getWorldPosition(tempObjectPosition)
        this.camera.getWorldPosition(tempCameraPosition)
        return tempObjectPosition.distanceTo(tempCameraPosition)
    }

    public isInFov(object: THREE.Mesh): boolean {
        return this.frustum.intersectsObject(object)
    }

    public projectCamera(vector: THREE.Vector3): THREE.Vector3 {
        return vector.project(this.camera)
    }

    public resize(width: number = this.options.width, height: number = this.options.height): void {
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(window.innerWidth, window.innerHeight)
    }

    public setAmbientColor(color: number): void {
        this.ambientLight.color.setHex(color)
    }

    public setCameraPosition(position: IVector3): void {
        for (const i in position) {
            this.camera.position[i] = position[i]
        }
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
        let object = (typeof objectId === 'string' ? this.scene.getObjectByName(objectId) : objectId) as any

        object.add(this.camera)
        this.target = object

        const targetSize = this.getTargetSize()

        if (targetSize) {
            this.controls.minDistance = targetSize
        }
    }

    public setDistanceFromTarget(distance: number): void {
        this.controls.minDistance = distance
        this.controls.maxDistance = distance
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
        const { cameraPosition, far, fov, height, near, width } = this.options
        this.camera = new THREE.PerspectiveCamera(fov, width / height, near, far)
        this.scene.add(this.camera)
        this.setCameraPosition(cameraPosition)
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
        const { maxDistance, onRender, onZoom } = this.options
        requestAnimationFrame(this.render)
        this.renderer.render(this.scene, this.camera)
        this.updateCamera()

        if (onRender) {
            onRender()
        }

        const fromCenter = this.getDistanceFromCamera()
        const isDifferent = !this.lastDistanceFromTarget || (Math.max(fromCenter, this.lastDistanceFromTarget) / Math.min(fromCenter, this.lastDistanceFromTarget)) > 1.01

        if (onZoom && isDifferent) {
            this.lastDistanceFromTarget = fromCenter
            onZoom(fromCenter)
        }

        this.controls.maxDistance = maxDistance
        this.controls.minDistance = this.getTargetSize()
    }

    private updateCamera(): void {
        this.camera.matrixWorldInverse.getInverse(this.camera.matrixWorld)
        tempViewProjection.multiplyMatrices(this.camera.projectionMatrix, this.camera.matrixWorldInverse)
        this.frustum.setFromMatrix(tempViewProjection)

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

        if (geometry) {
            if (geometry.parameters.radius) {
                return geometry.parameters.radius * 2
            }
        }

        return null
    }

    /**
     * Bind UI events to scene.
     */
    private bindEvents(): void {
        const { element } = this.options

        element.addEventListener('mousedown', this.handleMouseDown)
        element.addEventListener('mouseup', this.handleMouseUp)
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
        const { onChangeTarget } = this.options

        if (event.pageX === this.startMouseX && event.pageY === this.startMouseY) {
            const mesh = this.select(event.pageX, event.pageY)

            if (mesh) {
                this.setCameraTarget(mesh)

                if (onChangeTarget) {
                    onChangeTarget(mesh.name)
                }
            }
        }
    }

}

export default Scene