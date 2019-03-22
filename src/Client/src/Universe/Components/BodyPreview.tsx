import * as React from 'react'

import { StatelessComponent } from '../../Utils'
import BodyFactory from '../Utils/BodyFactory'
import Scene from '../Utils/Scene'

interface IProps {
    body: Universis.Universe.Body.Simple
    height: number
    width: number
}

class BodyPreview extends StatelessComponent<IProps> {

    private parent: HTMLElement

    private bodyFactory: Universis.Factory<Universis.Universe.Body.Simple, Universis.Universe.Body.Container>

    constructor(props) {
        super(props)

        this.bodyFactory = new BodyFactory()
    }

    public componentDidMount(): void {
        const { body, height, width } = this.props

        const bodyContainer = this.bodyFactory.create(body)
        bodyContainer.childrenContainer.rotateX(Math.PI / 2)

        new Scene({
            ambientColor: 0xffffff,
            cameraDistance: body.diameter.x * 1.4,
            element: this.parent,
            height,
            follow: 1,
            objects: [bodyContainer.mesh],
            onRender: () => {
                bodyContainer.childrenContainer.rotation.y += 0.01
            },
            width
        })
    }

    public render(): React.ReactNode {
        return (
            <section className='body-preview' ref={ref => this.parent = ref} />
        )
    }

}

export default BodyPreview.connect()