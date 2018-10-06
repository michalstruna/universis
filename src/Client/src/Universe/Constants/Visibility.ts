/**
 * All visibilities of body.
 */
enum Visibility {

    /**
     * Orbit and name are visible.
     */
    VISIBLE = 1,

    /**
     * Orbit is semi-visible, but name is not visible.
     */
    SEMI_VISIBLE = 0.2,

    /**
     * Orbit and name are invisible.
     */
    INVISIBLE = 0
}

export default Visibility