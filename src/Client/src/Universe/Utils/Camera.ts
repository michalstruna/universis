import * as THREE from 'three'
import Config from '../Constants/Config'

const TrackballControls = require('three-trackballcontrols')

const viewProjectionMatrix = new THREE.Matrix4()

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
     * Last view size of camera.
     */
    private viewSize: number

    /**
     * Helper for decide if mesh is on camera or not.
     */
    private frustum: THREE.Frustum

    public constructor() {
        this.frustum = new THREE.Frustum()

        this.camera = new THREE.PerspectiveCamera(
            Config.CAMERA_FOV,
            window.innerWidth / window.innerHeight,
            Config.CAMERA_MIN_DISTANCE,
            Config.CAMERA_MAX_DISTANCE
        )

        this.camera.position.z = 1

        this.controls = new TrackballControls(this.camera)
        this.controls.maxDistance = Config.CAMERA_MAX_DISTANCE
    }

    public setAspectRatio(aspectRatio: number): void {
        this.camera.aspect = aspectRatio
        this.camera.updateProjectionMatrix()
    }

    public getAspectRatio(): number {
        return this.camera.aspect
    }

    public setTarget(mesh: THREE.Mesh): void {
        const radius = (mesh.geometry as THREE.SphereGeometry).parameters.radius
        this.setViewSizeLimit(radius * 2, radius * 4)
        mesh.children[0].add(this.camera)
        this.controls.target.set(0, 0, 0)
        this.target = mesh
    }

    public setViewSize(viewSize: number): void {
        viewSize *= Config.SIZE_RATIO
        this.setViewSizeLimit(Math.max(viewSize, this.controls.minDistance), viewSize)
        this.viewSize = viewSize
        this.camera.updateProjectionMatrix()
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
        this.camera.matrixWorldInverse.getInverse(this.camera.matrixWorld)
        viewProjectionMatrix.multiplyMatrices(this.camera.projectionMatrix, this.camera.matrixWorldInverse)
        this.frustum.setFromMatrix(viewProjectionMatrix)
    }

    public setViewSizeLimit(min: number, max: number): void {
        this.controls.maxDistance = max
        this.controls.minDistance = min
    }

}

export default Camera