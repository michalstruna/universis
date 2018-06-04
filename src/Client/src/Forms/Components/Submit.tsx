import * as React from 'react'

import { SimpleComponent } from '../../Utils'

/**
 * Component for rendering submit button.
 */
class Submit extends SimpleComponent {

    public render(): JSX.Element {
        return (
            <button
                className='form__button form__button--submit'
                type='submit'>
                <section className='form__button__text'>
                    {this.props.children}
                </section>
                <section className='form__button__icon' />
            </button>
        )
    }

}

export default Submit.connect()