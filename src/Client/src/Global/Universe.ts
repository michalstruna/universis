declare namespace Universis {

    /**
     * Interface for universe.
     */
    export interface Universe {

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
         * Toggle light.
         * @param isLightVisible Light is visible.
         */
        toggleLight(isLightVisible: boolean): void

        /**
         * Toggle visibility of orbits.
         * @param areOrbitsVisible Orbits is visible.
         */
        toggleOrbits(areOrbitsVisible: boolean): void

        /**
         * Set time speed.
         * @param timeSpeed
         */
        setTimeSpeed(timeSpeed: number): void

    }

}