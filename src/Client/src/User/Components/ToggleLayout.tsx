import * as React from 'react'

import { Component } from '../../Utils'

interface IProps {
    className: string
}

interface IState {

}

/**
 * Component ToggleLayout.
 */
class ToggleLayout extends Component<IProps, IState> {

    public render(): JSX.Element {
        return (
            <section className={this.props.className}>

            </section>
        )
    }

}

export default ToggleLayout.connect(
    ({}: any) => ({}),
    (dispatch: IDispatch) => ({})
)