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
    bodies: IObject<IBodyContainer>

    /**
     * Instance of factory for creating bodies.
     */
    bodyFactory: IFactory<ISimpleBody, IBodyContainer>

    /**
     * Instance of class for select bodies by coordinates.
     */
    bodySelector: IBodySelector

    /**
     * THREE.js entities.
     */
    scene: THREE.Scene
    renderer: THREE.WebGLRenderer
    camera: THREE.PerspectiveCamera
    controls: THREE.TrackballControls

}