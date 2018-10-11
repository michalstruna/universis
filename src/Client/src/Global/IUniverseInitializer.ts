/**
 * Interface for universe initializer.
 */
declare interface IUniverseInitializer {

    /**
     * HTML element for THREE.js canvas.
     */
    element: HTMLElement

    /**
     * List of all bodies in universe. Keys are ID of body.
     */
    bodies: IBodyContainer[]

    /**
     * Instance of factory for creating bodies.
     */
    bodyFactory: IFactory<ISimpleBody, IBodyContainer>

    /**
     * THREE.js entities.
     */
    scene: THREE.Scene
    renderer: THREE.WebGLRenderer
    darkColor: THREE.AmbientLight
    lightColor: THREE.AmbientLight

}