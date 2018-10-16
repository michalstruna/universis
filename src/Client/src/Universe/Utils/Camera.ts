import * as THREE from 'three'
import * as TWEEN from '@tweenjs/tween.js'

import Config from '../Constants/Config'
import Units from './Units'

const TrackballControls = require('three-trackballcontrols')

const viewProjectionMatrix = new THREE.Matrix4()
const cameraPosition = new THREE.Vector3()
const targetPosition = new THREE.Vector3()
const cameraLocalPosition = new THREE.Vector3()
const cameraGlobalPosition = new THREE.Vector3()

const oldTargetPosition = new THREE.Vector3()
const newTargetPosition = new THREE.Vector3()

let lastViewSize = null
let viewSize = null

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
        if (this.target) {
            cameraLocalPosition.copy(this.camera.position)
            this.camera.getWorldPosition(cameraGlobalPosition)

            this.target.getWorldPosition(oldTargetPosition)
            mesh.getWorldPosition(newTargetPosition)
            newTargetPosition.sub(oldTargetPosition)
            this.camera.position.add(newTargetPosition)

            mesh.add(this.camera)
        } else {
            mesh.add(this.camera)
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