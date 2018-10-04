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
     * Select body.
     * @param bodyId ID of body.
     */
    selectBody(bodyId: string): void

    /**
     * Toggle visibility of labels.
     * @param areLabelsVisible Labels are visible.
     */
    toggleLabels(areLabelsVisible: boolean): void

    /**
     * Toggle light.
     * @param isLightVisible Light is visible.
     */
    toggleLight(isLightVisible: boolean): void

}