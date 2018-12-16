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
    target?: THREE.Object3D | string

    /**
     * Use logarithmic depth buffer. (optional, default false)
     */
    logarithmicDepth?: boolean

    /**
     * If scene is controllable, this is max distance of camera from target. (optional, default Infinity)
     */
    maxDistance?: number

    /**
     * If scene is controllable, this is max distance of camera from target. (optional, default 0)
     */
    minDistance?: number

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
    onObjectClick?: IConsumer<string>

    /**
     * Callback for render loop. (optional)
     */
    onRender?: IRunnable

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
    getDistanceFromCamera(object?: THREE.Object3D): number

    /**
     * Get camera target.
     */
    getCameraTarget(): THREE.Object3D

    /**
     * Check if object is in field of vision of camera.
     */
    isInFov(object: THREE.Object3D): boolean

    /**
     * Project camera on vector.
     * @param vector Vector.
     */
    projectCamera(vector: THREE.Vector3): THREE.Vector3

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
    setCameraTarget(objectId: THREE.Object3D | string): void

    /**
     * Enable or disable controls.
     * @param isControllable
     */
    setControllable(isControllable: boolean): void

    /**
     * Set nearest distance of camera.
     * @param near Nearest distance from camera.
     */
    setMinDistanceFromCenter(near: number): void

}