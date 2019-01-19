import * as ClassNames from 'classnames'
import * as React from 'react'

import { Component } from '../../Utils'

interface IState {
    active: number
}

interface IProps {
    children: React.ReactNode[]
}

class ToggleLayout extends Component<IProps, IState> {

    public constructor(props) {
        super(props)

        this.state = {
            active: 0
        }
    }

    private renderItems(): React.ReactNode[] {
        return this.props.children.map((item, key) => (
            <section
                className={ClassNames('toggle-layout__item', { 'toggle-layout__item--active': key === this.state.active })}
                key={key}
                onClick={() => this.setState({ active: key })}>
                {item}
            </section>
        ))
    }

    public render(): React.ReactNode {
        return (
            <section className='toggle-layout'>
                {this.renderItems()}
            </section>
        )
    }

}

export default ToggleLayout.connect()