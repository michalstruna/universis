import * as React from 'react'

import { StatelessComponent } from '../../Utils'
import BodyFactory from '../Utils/BodyFactory'
import Scene from '../Utils/Scene'

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
        const { body, size } = this.props

        const bodyContainer = this.bodyFactory.create(body)
        bodyContainer.mesh.rotateX(-Math.PI / 2)

        new Scene({
            ambientColor: 0xffffff,
            cameraDistance: body.diameter.x * 1.4,
            element: this.parent,
            height: size,
            globalCamera: true,
            objects: [bodyContainer.mesh],
            onRender: () => bodyContainer.mesh.rotation.z -= 0.01,
            width: size
        })
    }

    public render(): React.ReactNode {
        return (
            <section className='body-preview' ref={ref => this.parent = ref} />
        )
    }

}

export default BodyPreview.connect()