/**
 * Container for body.
 */
class BodyContainer implements Universis.Universe.Body.Container {

    /**
     * Data about body.
     */
    private _data: Universis.Universe.Body.Simple

    /**
     * THREE mesh.
     */
    private _mesh: THREE.Object3D

    /**
     * Outer orbit.
     */
    private _orbit: THREE.Group

    /**
     * Label.
     */
    private _label: HTMLElement

    /**
     * Container for all children of body.
     */
    private _childrenContainer: THREE.Group

    public constructor(data: Universis.Universe.Body.Simple, mesh: THREE.Object3D, orbit: THREE.Group, label: HTMLElement, childrenContainer: THREE.Group) {
        this._data = data
        this._mesh = mesh
        this._orbit = orbit
        this._label = label
        this._childrenContainer = childrenContainer
    }

    get data(): Universis.Universe.Body.Simple {
        return this._data
    }

    get mesh(): THREE.Object3D {
        return this._mesh
    }

    get orbit(): THREE.Group {
        return this._orbit
    }

    get label(): HTMLElement {
        return this._label
    }

    get childrenContainer(): THREE.Group {
        return this._childrenContainer
    }
}

export default BodyContainer