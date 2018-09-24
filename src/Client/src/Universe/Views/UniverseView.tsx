import * as React from 'react'

import { Loader, View, FadeLayout } from '../../Utils'
import UniverseActions from '../Redux/UniverseActions'
import Canvas from '../Components/Canvas'
import UI from '../Components/UI'

interface IProps {
    bodies: ISimpleBody[],
    getBodies: IRunnable
}

class UniverseView extends View<IProps> {

    public componentWillMount() {
        //this.props.getBodies()
    }

    public render(): JSX.Element {
        // TODO: Show loader if bodies are not exist.

        return (
            <section className={this.getClassName('universe')}>
                <Canvas />
                <UI />
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