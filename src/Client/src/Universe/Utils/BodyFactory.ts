import * as THREE from 'three'

import Config from '../Constants/Config'
import TextureStore from './TextureStore'
import BodyContainer from './BodyContainer'

/**
 * Class for generating bodies in universe.
 */
class BodyFactory implements IFactory<ISimpleBody, IBodyContainer> {

    public create(body: ISimpleBody): IBodyContainer {
        const mesh = this.createMesh(body)
        const orbit = this.createOrbit(body)
        const label = this.createLabel(body)
        const childrenContainer = this.createChildrenContainer()
        mesh.add(childrenContainer)

        for (const ring of body.rings) {
            mesh.add(this.createRing(ring))
        }

        orbit.children[0].add(mesh)

        return new BodyContainer(
            body,
            mesh,
            orbit,
            label,
            childrenContainer
        )
    }

    private createChildrenContainer(): THREE.Mesh {
        return new THREE.Mesh()
    }

    /**
     * Create geometry for mesh.
     * @param body Source body.
     * @returns Mesh geometry.
     */
    private createGeometry(body: ISimpleBody): THREE.SphereGeometry {
        const geometry = new THREE.SphereGeometry(
            body.diameter.equatorial,
            Config.BODY_SEGMENTS,
            Config.BODY_SEGMENTS
        )

        geometry.applyMatrix(new THREE.Matrix4().makeScale(
            1,
            body.diameter.polar / body.diameter.equatorial,
            1
        ))


        geometry.applyMatrix(new THREE.Matrix4().makeRotationX(
            Math.PI / 2
        ))

        return geometry
    }

    /**
     * Create material for mesh.
     * @param body Source body.
     * @returns Mesh material.
     */
    private createMaterial(body: ISimpleBody): THREE.MeshBasicMaterial {
        const texture = TextureStore.get(body.texture)

        if (typeof body.type.emissiveColor === 'number') {
            return new THREE.MeshBasicMaterial({
                map: texture
            })
        } else {
            return new THREE.MeshPhongMaterial({
                map: texture,
                specularMap: texture,
                specular: new THREE.Color(0, 0, 0)
            })
        }
    }

    /**
     * Render orbit of body.
     * There must be outer body and inner body because of transformations.
     * (Pivot point is always in center, but orbit is not always in center.)
     * @return THREE object.
     */
    private createOrbit(body: ISimpleBody): THREE.Object3D {
        const outerOrbitMesh = new THREE.Object3D()
        const a = this.calculateA(body)
        const b = this.calculateB(body, a)
        const path = new THREE.EllipseCurve(0, 0, a, b, 0, 2 * Math.PI, false, 0)
        const geometry = new THREE.BufferGeometry().setFromPoints(path.getPoints(Config.ORBIT_SEGMENTS) as any)
        const material = new THREE.LineBasicMaterial({})
        const orbitMesh = new THREE.Line(geometry, material)
        orbitMesh.position.x = (body.orbit.apocenter - body.orbit.pericenter) / 2
        outerOrbitMesh.rotation.set(0, THREE.Math.degToRad(body.orbit.inclination), THREE.Math.degToRad(body.orbit.rotation || 0))
        outerOrbitMesh.add(orbitMesh)

        outerOrbitMesh.userData.path = path
        outerOrbitMesh.userData.angle = 0 // TODO: Add initial angle.

        return outerOrbitMesh
    }

    /**
     * Calculate semi-major axes.
     * @return Semi-major axes.
     */
    private calculateA(body: ISimpleBody): number {
        return (body.orbit.apocenter + body.orbit.pericenter) / 2
    }

    /**
     * Calculate semi-minor axes.
     * @param a Semi-majox axes.
     * @return Semi-minor axes.
     */
    private calculateB(body: ISimpleBody, a: number): number {
        return Math.sqrt(-Math.pow(a, 2) * body.orbit.eccentricity + Math.pow(a, 2))
    }

    /**
     * Create mesh of body.
     * @param body Source body.
     * @returns THREE mesh.
     */
    private createMesh(body: ISimpleBody): THREE.Mesh {
        const geometry = this.createGeometry(body)
        const material = this.createMaterial(body)
        const mesh = new THREE.Mesh(geometry, material)
        mesh.name = body._id

        if (body.type.emissiveColor) {
            mesh.add(new THREE.PointLight(body.type.emissiveColor, 0.7, 1000000000)) // TODO: Calc distance from size of body.
        }

        mesh.position.set(0, 0, 0)
        mesh.rotation.set(0, THREE.Math.degToRad(body.tilt) || 0, 0)

        return mesh
    }

    /**
     * Create label of body.
     * @param body Source body.
     * @returns HTML div.
     */
    private createLabel(body: ISimpleBody): HTMLElement {
        const label = document.createElement('div')
        label.className = 'text-label' // TODO: Rename.
        label.innerHTML = body.name
        return label
    }

    /**
     * Create ring of body.
     * @param ring Ring data.
     * @return THREE mesh.
     */
    private createRing(ring: IBodyRing): THREE.Mesh {
        const geometry = new THREE.RingBufferGeometry(
            ring.diameter.min,
            ring.diameter.max,
            Config.RING_SEGMENTS
        )

        const uvs = (geometry.attributes as any).uv.array

        let phiSegments = geometry.parameters.phiSegments || 0
        let thetaSegments = geometry.parameters.thetaSegments || 0
        phiSegments = phiSegments !== undefined ? Math.max(1, phiSegments) : 1
        thetaSegments = thetaSegments !== undefined ? Math.max(3, thetaSegments) : 8

        for (let c = 0, j = 0; j <= phiSegments; j++) {
            for (let i = 0; i <= thetaSegments; i++) {
                uvs[c++] = i / thetaSegments
                uvs[c++] = j / phiSegments
            }
        }

        const texture = TextureStore.get(ring.texture)
        const material = new THREE.MeshLambertMaterial({
            map: texture,
            side: THREE.DoubleSide,
            specularMap: texture,
            transparent: true
        })

        return new THREE.Mesh(geometry, material)
    }

}

export default BodyFactory