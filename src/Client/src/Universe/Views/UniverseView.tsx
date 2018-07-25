import * as React from 'react'

import UniverseActions from '../Redux/UniverseActions'
import { View } from '../../Utils'

interface IProps {
    bodies: ISimpleBody[],
    getBodies: IRunnable
}

class UniverseView extends View<IProps> {

    componentWillMount(): void {
        this.props.getBodies()
    }

    public render(): JSX.Element {
        return (
            <section className={this.getClassName('universe')}>
                {this.props.bodies ? JSON.stringify(this.props.bodies) : 'Loading...'}
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