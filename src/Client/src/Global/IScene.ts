/**
 * Interface for scene options.
 */
declare interface ISceneOptions {

    /**
     * Color of space (ambient light). (optional, default black)
     */
    ambientColor?: number

    /**
     * Background color. (optional, default is transparent)
     */
    backgroundColor?: number

    /**
     * Initial position of camera. (optional, default [0, 0, 0]).
     */
    cameraPosition?: IVector3

    /**
     * With camera trackball controls. (optional, default false)
     */
    controllable?: boolean

    /**
     * Farest visibility of camera. (optional, default 1e50)
     */
    far?: number

    /**
     * Field of camera vision [°]. (optional, default 75)
     */
    fov?: number

    /**
     * HTML element for canvas.
     */
    element: HTMLElement

    /**
     * Height of canvas. (optional, default window.innerHeight)
     */
    height?: number

    /**
     * Initial camera target.
     */
    target?: THREE.Mesh | string

    /**
     * Use logarithmic depth buffer. (optional, default false)
     */
    logarithmicDepth?: boolean

    /**
     * If scene is controllable, this is max distance of camera from target. (optional, default Infinity)
     */
    maxDistance?: number

    /**
     * Nearest visibility of camera. (optional, default 1e-3)
     */
    near?: number

    /**
     * List of objects in scene. (optional, default empty array)
     */
    objects?: THREE.Object3D[]

    /**
     * Handler for click on object. There is ID of object in parameter. (optional)
     */
    onChangeTarget?: IConsumer<string>

    /**
     * Callback for render loop. (optional)
     */
    onRender?: IRunnable

    /**
     * Callback for change distance from camera target. There is current distance in parameter. (optional)
     */
    onZoom?: IConsumer<number>

    /**
     * Width of canvas. (optional, default window.innerWidth)
     */
    width?: number

}

declare interface IVector3 {

    /**
     * Optional x coordinate.
     */
    x?: number

    /**
     * Optional y coordinate.
     */
    y?: number

    /**
     * Optional z coordinate.
     */
    z?: number
}

/**
 * Interface for scene.
 */
declare interface IScene {

    /**
     * Calculate camera distance from object.
     * @param object Object. (optional, default target object)
     */
    getDistanceFromCamera(object?: THREE.Mesh): number

    /**
     * Get camera target.
     */
    getCameraTarget(): THREE.Mesh

    /**
     * Check if object is in field of vision of camera.
     */
    isInFov(object: THREE.Mesh): boolean

    /**
     * Project camera on vector.
     * @param vector Vector.
     */
    projectCamera(vector: THREE.Vector3): THREE.Vector3

    /**
     * Resize scene.
     * @param width New width.
     * @param height New height.
     */
    resize(width: number, height: number): void

    /**
     * Set color of ambient light.
     * @param color Color.
     */
    setAmbientColor(color: number): void

    /**
     * Set position of camera.
     * @param position New position.
     */
    setCameraPosition(position: IVector3): void

    /**
     * Set camera target.
     * @param objectId ID of target object. It could be string ID or whole object.
     */
    setCameraTarget(objectId: THREE.Mesh | string): void

    /**
     * Enable or disable controls.
     * @param isControllable
     */
    setControllable(isControllable: boolean): void

    /**
     * Set camera distance from target.
     * @param distance
     */
    setDistanceFromTarget(distance: number): void

}