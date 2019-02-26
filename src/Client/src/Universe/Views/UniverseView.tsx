import * as React from 'react'

import { View, AsyncEntity } from '../../Utils'
import { getBodies } from '../Redux/UniverseActions'
import Simulator from '../Components/Simulator'

interface IProps {
    bodies: Universis.Redux.AsyncEntity<Universis.Universe.Body.Simple[]>
    getBodies: Universis.Runnable
}

class UniverseView extends View<IProps> {

    public componentWillMount() {
        const { bodies, getBodies } = this.props
        AsyncEntity.request(bodies, getBodies)
    }

    public render(): React.ReactNode {
        const { bodies } = this.props

        return (
            <section className={this.getClassName('universe')}>
                <AsyncEntity
                    data={bodies}
                    success={() => (
                        <Simulator />
                    )} />
            </section>
        )
    }

}

export default UniverseView.connect(
    ({ universe }: Universis.Redux.StoreState) => ({
        bodies: universe.bodies
    }),
    { getBodies }
)