import * as THREE from 'three'

import Config from '../Constants/Config'
import Visibility from '../Constants/Visibility'

import Scene from '../Utils/Scene'
import BodyFactory from './BodyFactory'

/**
 * Temp variables.
 */
const tempVector = new THREE.Vector3()
const rotationVector = new THREE.Vector3(0, 0, 1)

interface IOptions {
    element: HTMLElement
    bodies: ISimpleBody[]
    onChangeViewSize: IConsumer<number>
    onSelectBody: IConsumer<string>
}

class Universe implements IUniverse {

    /**
     * Instance of THREE.js scene.
     */
    private scene: IScene

    /**
     * List of all bodies in universe.
     */
    private bodies: IBodyContainer[]
    private rootBodies: THREE.Object3D[]

    /**
     * Visibility of labels.
     */
    private areLabelsVisible: boolean

    /**
     * Scale of scene.
     */
    private scale: number

    /**
     * Body factory.
     */
    private bodyFactory: IFactory<ISimpleBody, IBodyContainer>

    public constructor(options: IOptions) {
        this.bodyFactory = new BodyFactory()
        this.createBodies(options.bodies)

        this.scene = new Scene({
            backgroundColor: 0x000000,
            controllable: true,
            element: options.element,
            logarithmicDepth: true,
            objects: this.rootBodies,
            onRender: () => this.updateBodies()
        })
    }

    public resize(): void {
        //this.camera.setAspectRatio(window.innerWidth / window.innerHeight)
        //this.renderer.setSize(window.innerWidth, window.innerHeight)
    }

    public selectBody(bodyId: string): void {
        this.scene.setCameraTarget(bodyId)
    }

    public setViewSize(viewSize: number): void {
        this.scene.setCameraPosition({ z: viewSize })
    }

    public toggleLabels(areLabelsVisible: boolean): void {
        this.areLabelsVisible = areLabelsVisible
    }

    public toggleLight(isLightVisible: boolean): void {
        this.scene.setAmbientColor(isLightVisible ? Config.LIGHT_COLOR : Config.DARK_COLOR)
    }

    public toggleOrbits(areOrbitsVisible: boolean): void {
        for (const body of this.bodies) {
            (body.orbit.children[0] as any).material.visible = areOrbitsVisible
        }
    }

    /**
     * Update position of all bodies within render loop.
     */
    private updateBodies = (): void => {
        if(!this.scene) {
            return
        }

        //this.setScale(this.scene.getDistanceFromCamera() * this.scale)
        //this.camera.update()

        for (const body of  this.bodies) {
           /* tempVector.setFromMatrixPosition(body.mesh.matrixWorld)
            const vector = this.scene.projectCamera(tempVector)
            const isVisible = this.scene.isInFov(body.mesh)
            const orbit = body.orbit.children[0] as any
            const visibility = body.data.orbit ? this.getVisibility(body) : Visibility.INVISIBLE
            const isSelectedBody = body.data._id === this.scene.getCameraTarget().name

            if (this.areLabelsVisible && (visibility === Visibility.VISIBLE && isVisible || isSelectedBody)) {
                vector.x = (vector.x + 1) / 2 * window.innerWidth
                vector.y = -(vector.y - 1) / 2 * window.innerHeight

                body.label.style.transform = 'translateX(' + vector.x + 'px) translateY(' + vector.y + 'px)'
            } else {
                body.label.style.transform = 'translateX(-1000px)'
            }

            orbit.material.opacity = visibility

            if (body.data.orbit) {
                const orbitPoint = body.orbit.userData.path.getPoint(body.orbit.userData.angle)
                body.orbit.userData.angle += (0.00001 * Math.PI * 2 * 365 * 24 * 60 / 1893415560) / (body.data.orbit.period || 1)

                if (visibility === Visibility.INVISIBLE && !isSelectedBody && body.data.name === 'Slunce') {
                    body.mesh.position.set(0, 0, 0)
                } else {
                    body.mesh.position.set(orbitPoint.x, orbitPoint.y, 0)
                }

                body.mesh.rotateOnAxis(rotationVector, 0.001) // TODO: Only if rotate difference is bigger than 0.0001.
                body.childrenContainer.rotateOnAxis(rotationVector, -0.001)
            }*/
        }

        //this.scene.setMinDistanceFromCenter(((this.scene.getCameraTarget() as THREE.Mesh).geometry as THREE.SphereGeometry).parameters.radius * 2)
    }

    /**
     * Universe is split into chunks, because of precision of numbers in JavaScript.
     * If scene is too small or too large, scale it.
     * @param viewSize Distance camera from centered body.
     */
    private setScale(viewSize: number): void {
        if (viewSize > 1e6) {
            this.scale /= 1e3
        } else if (viewSize < 1e3) {
            this.scale *= 1e3
        }
    }

    /**
     * Check if body is visible.
     * @param body Body.
     * @returns Body visibility.
     */
    private getVisibility(body: IBodyContainer): Visibility {
        const viewSize = this.scene.getDistanceFromCamera()

        const min = viewSize / body.data.orbit.apocenter
        const distance = this.scene.getDistanceFromCamera(body.mesh)
        const max = viewSize / distance

        if (min > Config.INVISIBILITY_EDGE || Math.min(max, min) < (1 / Config.INVISIBILITY_EDGE)) {
            return Visibility.INVISIBLE
        } else if (min > Config.SEMI_VISIBILITY_EDGE || Math.min(max, min) < (1 / Config.SEMI_VISIBILITY_EDGE)) {
            return Visibility.SEMI_VISIBLE
        } else {
            return Visibility.VISIBLE
        }
    }

    /**
     * Create bodies in universe and assign them to parents.
     * @param bodies List of all bodies.
     */
    private createBodies(bodies: ISimpleBody[]): void {
        this.bodies = []
        this.rootBodies = []

        for (const data of bodies) {
            //this.setScale(data)

            const body = this.bodyFactory.create(data)
            this.bodies.push(body)
           // this.element.appendChild(body.label)

            if (data.parentId) {
                this.bodies.filter(body => body.data._id === data.parentId)[0].mesh.add(body.orbit)
                //this.scene.getObject(data.parentId).children[0].add(body.orbit)
            } else {
                this.rootBodies.push(body.orbit)
                //this.scene.addObject(body.orbit)
            }
        }

        //bodyContainers.forEach(body => {
          //  body.label.onclick = () => this.handleSelectBody(body.data._id)
        //})
    }

}

export default Universe