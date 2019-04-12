import * as THREE from 'three'

import Config from '../Constants/Config'
import TextureStore from './TextureStore'
import BodyContainer from './BodyContainer'
import { Random } from '../../Utils'

/**
 * Class for generating bodies in universe.
 */
class BodyFactory implements Universis.Factory<Universis.Universe.Body.Simple, Universis.Universe.Body.Container> {

    public create(body: Universis.Universe.Body.Simple): Universis.Universe.Body.Container {
        const childrenContainer = new THREE.Group()
        const mesh = this.createMesh(body, childrenContainer)
        const orbit = this.createOrbit(body)
        const label = this.createLabel(body)

        for (const ring of body.rings) {
            mesh.add(this.createRing(ring))
        }

        orbit.children[0].children[0].add(mesh)
        return new BodyContainer(body, mesh, orbit, label, childrenContainer)
    }

    /**
     * Create body.
     * @param body Body data.
     * @param child
     * @returns Body.
     */
    private createMesh(body: Universis.Universe.Body.Simple, child: THREE.Group): THREE.Mesh | THREE.Points {
        let mesh

        if (body.type.particlesGenerator) {
            const geometry = new THREE.Geometry()
            const particleGenerator = new Function('body', 'Random', body.type.particlesGenerator)

            for (let i = 0; i < body.particles.count; i++) {
                let [x, y, z] = particleGenerator(body, Random)
                geometry.vertices.push(new THREE.Vector3(x, y, z))
            }

            mesh = new THREE.Points(geometry, new THREE.PointsMaterial({
                color: 0xaaaaaa,
                size: body.particles.size
            }))
        } else {
            const geometry = this.createGeometry(body, 32) // TODO: LOD
            const material = this.createMaterial(body)
            mesh = new THREE.Mesh(geometry, material)
        }

        mesh.add(child)

        if (body.type.emissiveColor && body.type.emissiveColor !== '#000000') {
            mesh.add(new THREE.PointLight(body.type.emissiveColor, 1, body.diameter.x * 1e4))
        }

        mesh.name = body._id
        mesh.position.set(0, 0, 0)
        mesh.rotation.set(0, THREE.Math.degToRad(body.axis.tilt) || 0, 0)

        return mesh
    }

    /**
     * Create geometry for mesh.
     * @param body Source body.
     * @param segmentsCount
     * @returns Mesh geometry.
     */
    private createGeometry(body: Universis.Universe.Body.Simple, segmentsCount: number): THREE.SphereGeometry {
        const geometry = new THREE.SphereGeometry(body.diameter.x / 2, segmentsCount, segmentsCount)
        geometry.applyMatrix(new THREE.Matrix4().makeScale(1, body.diameter.y / body.diameter.x, 1))
        geometry.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI / 2))
        return geometry
    }

    /**
     * Create material for mesh.
     * @param body Source body.
     * @returns Mesh material.
     */
    private createMaterial(body: Universis.Universe.Body.Simple): THREE.MeshBasicMaterial {
        const texture = TextureStore.get(body.texture || body.type.texture)
        let material: THREE.MeshBasicMaterial | THREE.MeshPhongMaterial

        if (typeof body.type.emissiveColor === 'number') {
            material = new THREE.MeshBasicMaterial({
                map: texture
                //side: THREE.DoubleSide // TODO: Universe background?
            })
        } else {
            material = new THREE.MeshPhongMaterial({
                map: texture,
                specularMap: texture,
                specular: new THREE.Color(0, 0, 0)
            })
        }

        material.needsUpdate = false

        return material
    }

    /**
     * Render orbit of body.
     * There must be outer body and inner body because of transformations.
     * (Pivot point is always in center, but orbit is not always in center.)
     * @return THREE group.
     */
    private createOrbit(body: Universis.Universe.Body.Simple): THREE.Group {
        const outerOrbitMesh = new THREE.Group()

        if (body.orbit) {
            const a = this.calculateA(body)
            const b = this.calculateB(body, a)
            const path = new THREE.EllipseCurve(0, 0, a, b, 0, 2 * Math.PI, false, 0)
            const geometry = new THREE.Geometry().setFromPoints(path.getPoints(Config.ORBIT_SEGMENTS) as any)
            const material = new THREE.LineBasicMaterial({ color: Config.ORBIT_COLOR })
            material.transparent = true

            const midOrbitMesh = new THREE.Group()
            outerOrbitMesh.add(midOrbitMesh)
            midOrbitMesh.rotateOnAxis(new THREE.Vector3(0, 0, 1), THREE.Math.degToRad(body.orbit.rotation || 0))

            const orbitMesh = new THREE.Line(geometry, material)
            orbitMesh.position.x = (body.orbit.apsis - body.orbit.periapsis) / 2
            outerOrbitMesh.rotation.set(0, THREE.Math.degToRad(body.orbit.inclination), 0)
            midOrbitMesh.add(orbitMesh)

            outerOrbitMesh.userData.path = path
            outerOrbitMesh.userData.angle = 0
        } else {
            const orbitMesh = new THREE.Mesh()
            const midOrbitMesh = new THREE.Group()
            midOrbitMesh.add(orbitMesh)
            outerOrbitMesh.add(midOrbitMesh)

            if (body.position) {
                const alpha = THREE.Math.degToRad(body.position.alpha)
                const beta = THREE.Math.degToRad(body.position.beta)
                const distance = body.position.distance

                outerOrbitMesh.position.set(
                    distance * Math.sin(alpha) * Math.sin(beta),
                    distance * Math.cos(alpha),
                    distance * Math.sin(alpha) * Math.cos(beta)
                )
            }
        }

        return outerOrbitMesh
    }

    /**
     * Calculate semi-major axes.
     * @return Semi-major axes.
     */
    private calculateA(body: Universis.Universe.Body.Simple): number {
        return (body.orbit.apsis + body.orbit.periapsis) / 2
    }

    /**
     * Calculate semi-minor axes.
     * @param a Semi-majox axes.
     * @return Semi-minor axes.
     */
    private calculateB(body: Universis.Universe.Body.Simple, a: number): number {
        return Math.sqrt(-Math.pow(a, 2) * body.orbit.eccentricity + Math.pow(a, 2))
    }

    /**
     * Create label of body.
     * @param body Source body.
     * @returns HTML div.
     */
    private createLabel(body: Universis.Universe.Body.Simple): HTMLElement {
        const label = document.createElement('div')
        label.className = 'universe__label'
        return label
    }

    /**
     * Create ring of body.
     * @param ring Ring data.
     * @return THREE mesh.
     */
    private createRing(ring: Universis.Universe.Ring): THREE.Mesh {
        const geometry = new THREE.RingBufferGeometry(
            ring.diameter.min / 2,
            ring.diameter.max / 2,
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
        const material = new THREE.MeshPhongMaterial({
            map: texture,
            side: THREE.DoubleSide,
            specularMap: texture,
            transparent: true
        })

        return new THREE.Mesh(geometry, material)
    }

}

export default BodyFactory