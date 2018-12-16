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
    minDistance: 0,
    near: 1e-3,
    objects: [],
    width: window.innerWidth
}

let tempObjectPosition = new THREE.Vector3()
let tempCameraPosition = new THREE.Vector3()
let tempTargetPosition = new THREE.Vector3()
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
    private target: THREE.Object3D

    /**
     * THREE.js entities.
     */
    private scene: THREE.Scene
    private camera: THREE.PerspectiveCamera
    private renderer: THREE.WebGLRenderer
    private ambientLight: THREE.AmbientLight
    private frustum: THREE.Frustum
    private controls: THREE.TrackballControls

    private viewSize: number
    private lastViewSize: number

    constructor(options: ISceneOptions) {
        this.options = {
            ...DEFAULT_OPTIONS,
            ...options
        }

        this.createScene()
        this.createCamera()
        this.createRenderer()
        this.createAmbientLight()
        this.createObjects()
        this.createFrustum()

        if (this.options.controllable) {
            this.createControls()
        }

        if (this.options.target) {
            this.setCameraTarget(this.options.target)
        }

        this.append()
        this.render()
    }

    public getCameraTarget(): THREE.Object3D {
        return this.target
    }

    public getDistanceFromCamera(object: THREE.Object3D = this.target): number {
        object.getWorldPosition(tempObjectPosition)
        return tempObjectPosition.distanceTo(this.camera.position)
    }

    public isInFov(object: THREE.Object3D): boolean {
        return this.frustum.intersectsObject(object)
    }

    public projectCamera(vector: THREE.Vector3): THREE.Vector3 {
        return vector.project(this.camera)
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
        if (!this.controls) {
            this.createControls()
        }

        this.controls.enabled = isControllable
    }

    public setCameraTarget(objectId: string | THREE.Object3D): void {
        let object = (typeof objectId === 'string' ? this.scene.getObjectByName(objectId) : objectId) as any

        object.add(this.camera)
        this.target = object

        if (this.controls) {
            if (object.geometry) {
                if (object.geometry.boundingSphere) {
                    this.controls.minDistance = object.geometry.boundingSphere.radius * 2
                }
            }

        }
    }

    public setMinDistanceFromCenter(distance: number): void {

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
     * Add objects to scene.
     */
    private createObjects(): void {
        const { objects } = this.options

        for (const object of objects) {
            this.scene.add(object)
        }
    }

    /**
     * Create three frustum.
     */
    private createFrustum(): void {
        this.frustum = new THREE.Frustum()
    }

    private createControls(): void {
        const { maxDistance, minDistance } = this.options
        this.controls = new TrackballControls(this.camera)
        this.controls.maxDistance = maxDistance
        this.controls.minDistance = minDistance
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
        const { onRender } = this.options
        requestAnimationFrame(this.render)
        this.renderer.render(this.scene, this.camera)
        this.updateCamera()

        if (onRender) {
            onRender()
        }
    }

    private updateCamera(): void {
        //this.camera.getWorldPosition(tempCameraPosition)
        //this.target.getWorldPosition(tempTargetPosition)
        // this.viewSize = this.getDistanceFromCamera()

        // if (Units.isDifferent(this.viewSize, this.lastViewSize) && this.handleChangeViewSize) {
        // this.lastViewSize = this.viewSize
        //this.handleChangeViewSize(this.viewSize / Config.SIZE_RATIO)
        // }

        this.camera.matrixWorldInverse.getInverse(this.camera.matrixWorld)
        tempViewProjection.multiplyMatrices(this.camera.projectionMatrix, this.camera.matrixWorldInverse)
        this.frustum.setFromMatrix(tempViewProjection)

        if (this.controls) {
            this.controls.update()
        }
    }

}

export default Scene

/**
 Viewsize rename
 */