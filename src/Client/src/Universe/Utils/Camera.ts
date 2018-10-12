import * as THREE from 'three'
import * as TWEEN from '@tweenjs/tween.js'

import Config from '../Constants/Config'
import Units from './Units'

const TrackballControls = require('three-trackballcontrols')

const viewProjectionMatrix = new THREE.Matrix4()
const cameraPosition = new THREE.Vector3()
const meshPosition = new THREE.Vector3()
const targetPosition = new THREE.Vector3()
const cameraLocalPosition = new THREE.Vector3()
let lastViewSize = null
let viewSize = null

interface IOptions {
    scene: THREE.Scene
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
        mesh.getWorldPosition(targetPosition)

        const radius = (mesh.geometry as THREE.SphereGeometry).parameters.radius

        if (this.target) {
            cameraLocalPosition.set(this.camera.position.x, this.camera.position.y, this.camera.position.z)
            this.scene.add(this.camera)
            this.camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z)
            this.controls.target = meshPosition

           // const tween = { x: this.controls.target.x, y: this.controls.target.y, z: this.controls.target.z }

            new TWEEN
                .Tween(this.controls.target)
                .to(targetPosition, 1000)
                .onUpdate(() => {
                    this.controls.target = this.controls.target
                })
                .onComplete(() => {
                    this.camera.position.set(cameraLocalPosition.x, cameraLocalPosition.y, cameraLocalPosition.z)
                    this.controls.target.set(0, 0, 0)
                    mesh.add(this.camera)
                    this.target = mesh
                })
                .start()

            /*setTimeout(() => {
                this.controls.target = targetPosition

                setTimeout(() => {
                    this.camera.position.sub(targetPosition)
                    this.controls.target.set(0, 0, 0)
                    mesh.add(this.camera)
                    this.target = mesh
                }, 1000)
            }, 1000)*/
            // TODO: Tween animation.
        } else {
            this.setViewSizeLimit(radius * 2, radius * 4)
            mesh.children[0].add(this.camera)
            this.controls.target.set(0, 0, 0)
            this.target = mesh
        }
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