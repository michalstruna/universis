/**
 * Interface for universe.
 */
declare interface IUniverse {

    /**
     * Resize scene.
     */
    resize(): void

    /**
     * Set distance of camera from target body.
     */
    setViewSize(viewSize: number): void

    /**
     * If view size is changed, run callback.
     * @param callback Callback with view size in parameter.
     */
    setOnChangeViewSize(callback: IConsumer<number>): void

}