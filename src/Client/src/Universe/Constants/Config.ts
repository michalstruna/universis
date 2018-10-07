export default {

    /**
     * This body will be centered on start of simulator.
     */
    INITIAL_BODY: 'Země',

    /**
     * Color of orbits.
     */
    ORBIT_COLOR: 0x555555,

    /**
     * Color of universe background.
     */
    DARK_COLOR: 0x222222,

    /**
     * Color of light.
     */
    LIGHT_COLOR: 0x777777,

    /**
     * Count of segments of body.
     */
    BODY_SEGMENTS: 32,

    /**
     * Count of segments of orbits.
     */
    ORBIT_SEGMENTS: 1024,

    /**
     * Count of segments of body ring.
     */
    RING_SEGMENTS: 32,

    /**
     * Min camera distance.
     */
    CAMERA_MIN_DISTANCE: 0.001,

    /**
     * Max camera distance.
     */
    CAMERA_MAX_DISTANCE: 1e22,

    /**
     * Field of visibility.
     */
    CAMERA_FOV: 50,

    /**
     * Relative size of three meshes and distances.
     */
    SIZE_RATIO: 0.001,

    /**
     * Path of all textures.
     */
    TEXTURES_PATH: '/Images/Universe/Textures/',

    /**
     * Lets SEMI_VISIBILITY_EDGE = 20.
     * Labels and orbits of bodies will be visible only
     * when orbit of body will be bigger than 1 / 20 of screen
     * and smaller than 20× of screen.
     */
    SEMI_VISIBILITY_EDGE: 40,
    INVISIBILITY_EDGE: 1000,

}