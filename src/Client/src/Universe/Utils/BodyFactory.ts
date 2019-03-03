import * as THREE from 'three'

import Config from '../Constants/Config'
import TextureStore from './TextureStore'
import BodyContainer from './BodyContainer'

function exponential(mean) {
    var r = Math.random();
    return - mean * Math.log(r);
}

function normal(mean, std) {
    var x = 0
    for (var i = 1; i <= 12; i++) {
        x += Math.random()
    }
    return (x - 6)*std + mean
}



const generateRing = (min, max) => {
    const geometry = new THREE.Geometry()

    for (let i = 0; i < 3000; i++) {
        const distance = normal(149597870 * ((max + min) / 2), 149597870 * ((max - min) / 4))
        const vertex = new THREE.Vector3()
        const phi = THREE.Math.randFloatSpread(360)

        vertex.x = distance * Math.cos(phi)
        vertex.y = distance * Math.sin(phi)
        vertex.z = normal(0, 100000000)

        geometry.vertices.push(vertex)
    }

    return new THREE.Points(geometry, new THREE.PointsMaterial({ color: 0xaaaaaa, size: 1e4 }))
}

const generateSphere = (min, max) => {
    const geometry = new THREE.Geometry()

    for (let i = 0; i < 3000; i++) {
        let distance = exponential((max * 149597870 - min * 149597870) + min * 149597870)

        const vertex = new THREE.Vector3()
        const phi = THREE.Math.randFloatSpread(360)
        const theta = THREE.Math.randFloatSpread(360)

        vertex.x = distance * Math.cos(phi) * Math.cos(theta)
        vertex.y = distance * Math.sin(phi) * Math.cos(theta)
        vertex.z = distance * Math.sin(theta)

        geometry.vertices.push(vertex)
    }

    return new THREE.Points(geometry, new THREE.PointsMaterial({
        color: 0xaaaaaa,
        size: 1e4,
       // map: createCanvasMaterial(0xaaaaaa, 256),
        //transparent: true,
        //depthWrite: false
    }))
}

function createCanvasMaterial(color, size) {
    var matCanvas = document.createElement('canvas')
    matCanvas.width = matCanvas.height = size
    var matContext = matCanvas.getContext('2d')
    // create exture object from canvas.
    var texture = new THREE.Texture(matCanvas)
    // Draw a circle
    var center = size / 2
    matContext.beginPath()
    matContext.arc(center, center, size / 2, 0, 2 * Math.PI, false)
    matContext.closePath()
    matContext.fillStyle = color
    matContext.fill()
    // need to set needsUpdate
    texture.needsUpdate = true
    // return a texture made from the canvas
    return texture
}

/**
 * Class for generating bodies in universe.
 */
class BodyFactory implements Universis.Factory<Universis.Universe.Body.Simple, Universis.Universe.Body.Container> {

    public create(body: Universis.Universe.Body.Simple): Universis.Universe.Body.Container {
        const mesh = this.createMesh(body)
        const orbit = this.createOrbit(body)
        const label = this.createLabel(body)
        const childrenContainer = this.createChildrenContainer()
        mesh.add(childrenContainer)


        /*if (body.name === 'Slunce') {
            childrenContainer.add(generateRing(2, 4))
            childrenContainer.add(generateRing(38, 48))
            childrenContainer.add(generateSphere(2000, 150000))
        }*/


        for (const ring of body.rings) {
            mesh.add(this.createRing(ring))
        }

        (orbit.children[0].children[0] || orbit.children[0]).add(mesh)

        return new BodyContainer(
            body,
            mesh,
            orbit,
            label,
            childrenContainer
        )
    }

    private createChildrenContainer(): THREE.Group {
        return new THREE.Group()
    }

    /**
     * Create geometry for mesh.
     * @param body Source body.
     * @returns Mesh geometry.
     */
    private createGeometry(body: Universis.Universe.Body.Simple): THREE.SphereGeometry {
        const geometry = new THREE.SphereGeometry(
            body.diameter.x / 2,
            Config.BODY_SEGMENTS,
            Config.BODY_SEGMENTS
        )

        geometry.applyMatrix(new THREE.Matrix4().makeScale(
            1,
            body.diameter.y / body.diameter.x,
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
    private createMaterial(body: Universis.Universe.Body.Simple): THREE.MeshBasicMaterial {
        const texture = TextureStore.get(body.texture)
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
            const geometry = new THREE.BufferGeometry().setFromPoints(path.getPoints(Config.ORBIT_SEGMENTS) as any)
            const material = new THREE.LineBasicMaterial({ color: Config.ORBIT_COLOR })
            material.transparent = true

            const midOrbitMesh = new THREE.Group()
            outerOrbitMesh.add(midOrbitMesh)
            midOrbitMesh.rotateOnAxis(new THREE.Vector3(0, 0, 1), THREE.Math.degToRad(body.orbit.rotation || 0))

            const orbitMesh = new THREE.Line(geometry, material)
            orbitMesh.position.x = (body.orbit.apocenter - body.orbit.pericenter) / 2
            outerOrbitMesh.rotation.set(0, THREE.Math.degToRad(body.orbit.inclination), 0)
            midOrbitMesh.add(orbitMesh)

            outerOrbitMesh.userData.path = path
            outerOrbitMesh.userData.angle = 0 // TODO: Add initial angle.
        } else {
            const orbitMesh = new THREE.Mesh()
            outerOrbitMesh.add(orbitMesh)
        }

        return outerOrbitMesh
    }

    /**
     * Calculate semi-major axes.
     * @return Semi-major axes.
     */
    private calculateA(body: Universis.Universe.Body.Simple): number {
        return (body.orbit.apocenter + body.orbit.pericenter) / 2
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
     * Create mesh of body.
     * @param body Source body.
     * @returns THREE mesh.
     */
    private createMesh(body: Universis.Universe.Body.Simple): THREE.Mesh | THREE.Group | THREE.Points {
        if(body.type.virtualFlag === 2) {
            return this.createBelt(body)
        }

        const geometry = this.createGeometry(body)
        const material = this.createMaterial(body)

        const mesh = new THREE.Mesh(geometry, material)
        mesh.name = body._id

        if (body.type.emissiveColor) {
            mesh.add(new THREE.PointLight(body.type.emissiveColor, 1.5, 1000000000000)) // TODO: Calc distance from size of body.
        }

        mesh.position.set(0, 0, 0)
        mesh.rotation.set(0, THREE.Math.degToRad(body.axis.tilt) || 0, 0)

        return mesh
    }

    private createBelt(body: Universis.Universe.Body.Simple): THREE.Mesh | THREE.Group | THREE.Points {
        const geometry = new THREE.Geometry()

        for (let i = 0; i < 3000; i++) {
            const distance = normal((body.diameter.x - body.virtualData.thickness) / 2, body.virtualData.thickness / 4)
            const vertex = new THREE.Vector3()
            const phi = THREE.Math.randFloatSpread(360)

            vertex.x = distance * Math.cos(phi)
            vertex.y = distance * Math.sin(phi)
            vertex.z = normal(0, body.diameter.y / 2)

            geometry.vertices.push(vertex)
        }

        return new THREE.Points(geometry, new THREE.PointsMaterial({ color: 0xaaaaaa, size: 1e4 }))
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