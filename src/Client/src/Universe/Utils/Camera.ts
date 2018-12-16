import * as THREE from 'three'

import Config from '../Constants/Config'
import Units from './Units'

const TrackballControls = require('three-trackballcontrols')

/**
 * Wrapper for THREE.js camera.
 */
class Camera {

    /**
     * Multiply of radius of new target.
     */
    public static readonly DEFAULT_TARGET_DISTANCE = 3

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

    /*
     * Help variables.
     */
    private viewProjection = new THREE.Matrix4()
    private position = new THREE.Vector3()
    private direction = new THREE.Vector3()
    private targetPosition = new THREE.Vector3()
    private lastViewSize = null
    private viewSize = null

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
        mesh.add(this.camera)
        this.target = mesh
    }

    public setViewSize(viewSize: number): void {
        viewSize *= Config.SIZE_RATIO
        this.setViewSizeLimit(Math.max(viewSize, this.controls.minDistance), viewSize)
    }

    public getViewSize(): number {
        return this.viewSize
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
        this.camera.getWorldPosition(this.position)
        this.target.getWorldPosition(this.targetPosition)
        this.viewSize = this.targetPosition.distanceTo(this.position)

        if (Units.isDifferent(this.viewSize, this.lastViewSize) && this.handleChangeViewSize) {
            this.lastViewSize = this.viewSize
            this.handleChangeViewSize(this.viewSize / Config.SIZE_RATIO)
        }

        this.camera.matrixWorldInverse.getInverse(this.camera.matrixWorld)
        this.viewProjection.multiplyMatrices(this.camera.projectionMatrix, this.camera.matrixWorldInverse)
        this.frustum.setFromMatrix(this.viewProjection)
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
        return this.position
    }

}

export default Camera