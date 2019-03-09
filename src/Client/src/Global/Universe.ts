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
         * Set follow.
         * @param follow
         */
        setFollow(follow: number): void

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

        /**
         * Toggle visibility of body orbit velocity.
         * @param isVelocityVisible
         */
        toggleVelocity(isVelocityVisible: boolean): void

        /**
         * Toggle visibility of body name.
         * @param isNameVisible
         */
        toggleName(isNameVisible: boolean): void

        /**
         * Toggle visibility of distance from Earth.
         * @param isFromEarthVisible
         */
        toggleFromEarth(isFromEarthVisible: boolean): void

        /**
         * Toggle visibility of distance from camera.
         * @param isFromCameraVisible
         */
        toggleFromCamera(isFromCameraVisible: boolean): void

        /**
         * Toggle visibility of distance from center.
         * @param isFromCenterVisible
         */
        toggleFromCenter(isFromCenterVisible: boolean): void

        /**
         * Toggle visibility of particles.
         * @param areParticlesVisible
         */
        toggleParticles(areParticlesVisible: boolean): void

    }

}