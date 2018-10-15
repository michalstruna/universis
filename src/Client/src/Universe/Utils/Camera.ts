import * as THREE from 'three'
import * as TWEEN from '@tweenjs/tween.js'

import Config from '../Constants/Config'
import Units from './Units'

const TrackballControls = require('three-trackballcontrols')

const viewProjectionMatrix = new THREE.Matrix4()
const cameraDirection = new THREE.Vector3()
const cameraPosition = new THREE.Vector3()
const targetPosition = new THREE.Vector3()
const finalCameraPosition = new THREE.Vector3()
let lastViewSize = null
let viewSize = null

let cameraAnimation = false

/**
 * Wrapper for THREE.js camera.
 */
class Camera implements ICamera {

    /**
     * Native camera.
     */
    private camera: THREE.PerspectiveCamera

    /**
     * Controls for camera.
     */
    private controls: THREE.TrackballControls

    /**
     * Target mesh.
     */
    private target: THREE.Mesh

    /**
     * Helper for decide if mesh is on camera or not.
     */
    private frustum: THREE.Frustum

    /**
     * Scene, that contains camera.
     */
    private scene: THREE.Scene

    /**
     * Callback when view size is changed.
     */
    private handleChangeViewSize: IConsumer<number>

    public constructor(scene: THREE.Scene, handleChangeViewSize: IConsumer<number>) {
        this.frustum = new THREE.Frustum()

        this.scene = scene

        this.camera = new THREE.PerspectiveCamera(
            Config.CAMERA_FOV,
            window.innerWidth / window.innerHeight,
            Config.CAMERA_MIN_DISTANCE,
            Config.CAMERA_MAX_DISTANCE
        )

        this.camera.position.z = 1

        this.controls = new TrackballControls(this.camera)
        this.controls.maxDistance = Config.CAMERA_MAX_DISTANCE
        this.handleChangeViewSize = handleChangeViewSize
    }

    public setAspectRatio(aspectRatio: number): void {
        this.camera.aspect = aspectRatio
        this.camera.updateProjectionMatrix()
    }

    public getAspectRatio(): number {
        return this.camera.aspect
    }

    public setTarget(mesh: THREE.Mesh): void {
        this.scene.add(this.camera)
        const radius = (mesh.geometry as THREE.SphereGeometry).parameters.radius

        this.camera.getWorldDirection(cameraDirection)
        cameraDirection.multiplyScalar(-radius * 3)
        mesh.getWorldPosition(targetPosition)
        finalCameraPosition.copy(targetPosition)
        finalCameraPosition.add(cameraDirection)
        this.setViewSizeLimit(0, Infinity)

        if (this.target) {
            cameraAnimation = true
            const tween = { x: this.controls.target.x, y: this.controls.target.y, z: this.controls.target.z }

            this.animate(
                tween,
                targetPosition,
                () => {
                    this.controls.target.set(tween.x, tween.y, tween.z)
                    this.camera.lookAt(tween.x, tween.y, tween.z)
                },
                () => {
                    cameraAnimation = false
                    this.setViewSizeLimit(radius * 2, Infinity)
                }
            )

            this.animate(this.camera.position, finalCameraPosition)
        } else {

        }

        this.target = mesh
    }

    public setViewSize(viewSize: number): void {
        viewSize *= Config.SIZE_RATIO
        this.setViewSizeLimit(Math.max(viewSize, this.controls.minDistance), viewSize)
    }

    public getViewSize(): number {
        return viewSize
    }

    public getTarget(): THREE.Mesh {
        return this.target
    }

    public canSee(mesh: THREE.Mesh): boolean {
        return this.frustum.intersectsObject(mesh)
    }

    public getNativeCamera(): THREE.PerspectiveCamera {
        return this.camera
    }

    public getNativeControls(): THREE.TrackballControls {
        return this.controls
    }

    public update(): void {
        this.camera.getWorldPosition(cameraPosition)
        this.target.getWorldPosition(targetPosition)
        viewSize = targetPosition.distanceTo(cameraPosition)

        if (Units.isDifferent(viewSize, lastViewSize) && this.handleChangeViewSize) {
            lastViewSize = viewSize
            this.handleChangeViewSize(viewSize / Config.SIZE_RATIO)
        }

        this.camera.matrixWorldInverse.getInverse(this.camera.matrixWorld)
        viewProjectionMatrix.multiplyMatrices(this.camera.projectionMatrix, this.camera.matrixWorldInverse)
        this.frustum.setFromMatrix(viewProjectionMatrix)

        if (!cameraAnimation) {
            this.controls.target.copy(targetPosition)
            this.camera.lookAt(targetPosition.x, targetPosition.y, targetPosition.z)
        }


        this.controls.update()
    }

    public setViewSizeLimit(min: number, max: number): void {
        this.controls.maxDistance = max
        this.controls.minDistance = min
        this.controls.update()
    }

    public enableControls(isEnabled: boolean): void {
        this.controls.enabled = isEnabled
    }

    public getPosition(): THREE.Vector3 {
        return cameraPosition
    }

    /**
     * Start animation.
     * @param from Start state.
     * @param to Finished state.
     * @param onUpdate
     * @param onComplete Callback after complete. (optional)
     * @param duration Duration of animation [ms]. (optional, default 2000)
     * @param easing Type of easing. (optional, default TWEEN.Easing.Cubic.InOut
     */
    private animate(from: IObject<any>, to: IObject<any>, onUpdate?: IRunnable, onComplete?: IRunnable, duration = 2000, easing: any = TWEEN.Easing.Cubic.InOut): any {
        return new TWEEN
            .Tween(from)
            .to(to, duration)
            .easing(TWEEN.Easing.Cubic.InOut)
            .onUpdate(onUpdate ? onUpdate : () => null)
            .onComplete(onComplete ? onComplete : () => null)
            .start()
    }

}

export default Camera