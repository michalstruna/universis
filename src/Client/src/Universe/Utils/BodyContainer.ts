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
    private _mesh: THREE.Mesh

    /**
     * Outer orbit.
     */
    private _orbit: THREE.Object3D

    /**
     * Label.
     */
    private _label: HTMLElement

    /**
     * Container for all children of body.
     */
    private _childrenContainer: THREE.Object3D

    public constructor(data: Universis.Universe.Body.Simple, mesh: THREE.Mesh, orbit: THREE.Object3D, label: HTMLElement, childrenContainer: THREE.Object3D) {
        this._data = data
        this._mesh = mesh
        this._orbit = orbit
        this._label = label
        this._childrenContainer = childrenContainer
    }

    get data(): Universis.Universe.Body.Simple {
        return this._data
    }

    get mesh(): THREE.Mesh {
        return this._mesh
    }

    get orbit(): THREE.Object3D {
        return this._orbit
    }

    get label(): HTMLElement {
        return this._label
    }

    get childrenContainer(): THREE.Object3D {
        return this._childrenContainer
    }
}

export default BodyContainer