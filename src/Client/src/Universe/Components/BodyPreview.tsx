import * as React from 'react'
import * as THREE from 'three'

import { StatelessComponent } from '../../Utils'
import BodyFactory from '../Utils/BodyFactory'

interface IProps {
    body: ISimpleBody
    size: number
}

class BodyPreview extends StatelessComponent<IProps> {

    private parent: HTMLElement

    private bodyFactory: IFactory<ISimpleBody, IBodyContainer>

    constructor(props) {
        super(props)

        this.bodyFactory = new BodyFactory()
    }

    public componentDidMount(): void {
        /**
         * const scene = new Scene({
         *     getAspect: () => 1,
         *     getNear: () => selectedBody.diameter.x,
         *     getFar: () => universe.diameter.x,
         *     alpha: true,
         *     logaritmicBuffer: true,
         *     clearColor: 0x000000,
         *     size: size,
         *     meshes: [...]
         * })
         */


        const { body, size } = this.props
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75, 1, 2, 2000000000)
        const renderer = new THREE.WebGLRenderer({ alpha: true })
        renderer.setClearColor(0x000000, 0)

        renderer.setSize(size, size)
        this.parent.appendChild(renderer.domElement)

        scene.add(new THREE.AmbientLight(0xffffff))
        scene.add(camera)

        camera.position.z = body.diameter.x

        const bodyContainer = this.bodyFactory.create(body)
        bodyContainer.mesh.rotateX(-Math.PI / 2)
        bodyContainer.mesh.position.x = -body.diameter.x / 10

        scene.add(bodyContainer.mesh)

        const animate = () => {
            requestAnimationFrame(animate)
            renderer.render(scene, camera)
            bodyContainer.mesh.rotation.z -= 0.01
        }

        animate()
    }

    public render(): React.ReactNode {
        return (
            <section className='body-preview' ref={ref => this.parent = ref} />
        )
    }

}

export default BodyPreview.connect()