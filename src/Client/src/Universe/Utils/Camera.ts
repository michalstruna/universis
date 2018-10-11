import * as THREE from 'three'
import Config from '../Constants/Config'
import Units from './Units'

const TrackballControls = require('three-trackballcontrols')

const viewProjectionMatrix = new THREE.Matrix4()
const cameraPosition = new THREE.Vector3()
const meshPosition = new THREE.Vector3()
let lastViewSize = null
let viewSize = null

interface IOptions {
    onChangeViewSize: IConsumer<number>
}

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
     * Callback when view size is changed.
     */
    private handleChangeViewSize: IConsumer<number>

    public constructor(options: IOptions) {
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
        this.handleChangeViewSize = options.onChangeViewSize
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
        this.target.getWorldPosition(meshPosition)
        viewSize = meshPosition.distanceTo(cameraPosition)

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

}

export default Camera