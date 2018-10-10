/**
 * Interface for camera.
 */
declare interface ICamera {

    /**
     * Set aspect ratio of camera.
     * @param aspectRatio New aspect ratio of camera.
     */
    setAspectRatio(aspectRatio: number): void

    /**
     * Get aspect ratio.
     * @returns Aspect ratio.
     */
    getAspectRatio(): number

    /**
     * Set view size fo camera.
     * @param viewSize New view size of camera.
     */
    setViewSize(viewSize: number): void

    /**
     * Get view size.
     * @returns View size.
     */
    getViewSize(): number

    /**
     * Set target mesh - animated update camera position, camera lookAt and controls target.
     * @param mesh Target mesh.
     */
    setTarget(mesh: THREE.Mesh): void

    /**
     * Get target.
     * @returns Target mesh.
     */
    getTarget(): THREE.Mesh

    /**
     * Get native camera.
     * All actions should be called on ICamera, not native camera.
     * @returns Perspective camera.
     */
    getNativeCamera(): THREE.PerspectiveCamera

    /**
     * Get native controls.
     * @returns Controls.
     */
    getNativeControls(): THREE.TrackballControls

    /**
     * Decide if mesh is visible (inside camera view).
     * @param mesh Mesh.
     * @returns Mesh is visible.
     */
    canSee(mesh: THREE.Mesh): boolean

    /**
     * Update camera position data.
     */
    update(): void

    /**
     * Set max and min possible view size.
     * @param min Min view size.
     * @param max Max view size.
     */
    setViewSizeLimit(min: number, max: number): void

}