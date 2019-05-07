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
    LIGHT_COLOR: 0x888888,

    /**
     * Count of segments for distance from camera levels.
     * Each item is array [distance (in body diameters), segments count].
     */
    BODY_SEGMENTS: [[2, 1], [5, 3], [10, 5]],

    /**
     * Count of segments of orbits.
     */
    ORBIT_SEGMENTS: 1024,

    /**
     * Count of segments of body ring.
     */
    RING_SEGMENTS: 32,

    /**
     * Relative size of three meshes and distances.
     */
    SIZE_RATIO: 1,

    /**
     * Path of all textures.
     */
    TEXTURES_PATH: '/',

    /**
     * Lets SEMI_VISIBILITY_EDGE = 20.
     * Labels and orbits of bodies will be visible only
     * when orbit of body will be bigger than 1 / 20 of screen
     * and smaller than 20× of screen.
     */
    SEMI_VISIBILITY_EDGE: 40,
    INVISIBILITY_EDGE: 1000

}