declare namespace Universis {

    /**
     * Interface for scene.
     */
    export interface Scene {

        /**
         * Get camera target.
         * @returns Camera target mesh.
         */
        getCameraTarget(): THREE.Mesh

        /**
         * Calculate distance between two objects.
         * @param object1 First object.
         * @param object2 Second object (optional, default camera).
         * @returns Distance between objects.
         */
        getDistance(object1: THREE.Object3D, object2?: THREE.Object3D): number

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
        setCameraDistance(distance: number): void

    }

    export namespace Scene {

        /**
         * Interface for scene options.
         */
        export interface Options {

            /**
             * Color of space (ambient light). (optional, default black)
             */
            ambientColor?: number

            /**
             * Background color. (optional, default is transparent)
             */
            backgroundColor?: number

            /**
             * Initial distance of camera from target. (optional)
             */
            cameraDistance?: number

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
             * Camera will not be children of target, but always scene. (optional, default false)
             */
            globalCamera?: boolean

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
            onChangeTarget?: Universis.Consumer<string>

            /**
             * Callback for render loop. (optional)
             */
            onRender?: Universis.Runnable

            /**
             * Interval of scene callback onRender [ms]. (optional, default 16)
             */
            onRenderInterval?: number

            /**
             * Callback for change distance from camera target. There is current distance in parameter. (optional)
             */
            onZoom?: Universis.Consumer<number>

            /**
             * Width of canvas. (optional, default window.innerWidth)
             */
            width?: number

        }


    }

}