import * as React from 'react'

import { View, AsyncEntity } from '../../Utils'
import UniverseActions from '../Redux/UniverseActions'
import Canvas from '../Components/Canvas'
import UI from '../Components/UI'

interface IProps {
    bodies: IAsyncEntity<ISimpleBody[]>
    getBodies: IRunnable
}

class UniverseView extends View<IProps> {

    public componentWillMount() {
        const { bodies, getBodies } = this.props
        AsyncEntity.request(bodies, getBodies)
    }

    public render(): JSX.Element {
        const { bodies } = this.props

        return (
            <section className={this.getClassName('universe')}>
                <AsyncEntity
                    data={bodies}
                    success={() => (
                        <React.Fragment>
                            <Canvas />
                            <UI />
                        </React.Fragment>
                    )} />
            </section>
        )
    }

}

export default UniverseView.connect(
    ({ universe }: IStoreState) => ({
        bodies: universe.bodies
    }),
    (dispatch: IDispatch) => ({
        getBodies: () => dispatch(UniverseActions.getBodies())
    })
)