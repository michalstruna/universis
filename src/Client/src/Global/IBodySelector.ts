/**
 * Interface for body selector.
 */
declare interface IBodySelector {

    /**
     * Select body by coordinates on screen.
     * @param x Horizontal coordinate.
     * @param y Vertical coordinate.
     * @return Selected body or null.
     */
    select(x: number, y: number): THREE.Mesh | null

}