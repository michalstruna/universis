/**
 * All visibilities of body.
 */
enum Visibility {

    /**
     * Orbit and name are visible.
     */
    VISIBLE = 0x555555,

    /**
     * Orbit is semi-visible, but name is not visible.
     */
    SEMI_VISIBLE = 0x222222,

    /**
     * Orbit and name are invisible.
     */
    INVISIBLE = 0x000000
}

export default Visibility