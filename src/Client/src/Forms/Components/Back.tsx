import * as React from 'react'

import { StatelessComponent, Link } from '../../Utils'

interface IProps {
    to: string | Location
}

/**
 * Component for rendering back form button.
 */
class Submit extends StatelessComponent<IProps> {

    public render(): React.ReactNode {
        return (
            <Link
                className='form__button form__button--back'
                target={this.props.to}>
                <section className='form__button__icon' />
                <section className='form__button__text'>
                    {this.props.children}
                </section>
            </Link>
        )
    }

}

export default Submit.connect()