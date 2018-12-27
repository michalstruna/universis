/**
 * Interface for body container.
 */
declare interface IBodyContainer {

    /**
     * Getter for data about body.
     */
    readonly data: ISimpleBody

    /**
     * Getter for THREE mesh.
     */
    readonly mesh: THREE.Mesh

    /**
     * Getter for THREE mesh orbit.
     */
    readonly orbit: THREE.Object3D

    /**
     * Getter for label.
     */
    readonly label: HTMLElement

    /**
     * Container for all children of body.
     */
    readonly childrenContainer: THREE.Object3D

}