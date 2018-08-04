/**
 * Container for body.
 */
class BodyContainer implements IBodyContainer {

    /**
     * Data about body.
     */
    private _data: ISimpleBody

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
    private _childrenContainer: THREE.Mesh

    public constructor(data: ISimpleBody, mesh: THREE.Mesh, orbit: THREE.Object3D, label: HTMLElement, childrenContainer: THREE.Mesh) {
        this._data = data
        this._mesh = mesh
        this._orbit = orbit
        this._label = label
        this._childrenContainer = childrenContainer
    }

    get data(): ISimpleBody {
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

    get childrenContainer(): THREE.Mesh {
        return this._childrenContainer
    }
}

export default BodyContainer