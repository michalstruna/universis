import * as React from 'react'

import { Loader, View, FadeLayout } from '../../Utils'
import UniverseActions from '../Redux/UniverseActions'
import UniverseCanvas from '../Components/UniverseCanvas'

interface IProps {
    bodies: ISimpleBody[],
    getBodies: IRunnable
}

class UniverseView extends View<IProps> {

    public componentWillMount() {
        this.props.getBodies()
    }

    public render(): JSX.Element {
        const { bodies } = this.props

        // TODO: Show loader if bodies are not exist.

        return (
            <section className={this.getClassName('universe')}>
                <UniverseCanvas />
            </section>
        )
    }

}

export default UniverseView.connect(
    ({ universe }: any) => ({
        bodies: universe.bodies
    }),
    dispatch => ({
        getBodies: () => dispatch(UniverseActions.getBodies())
    })
)