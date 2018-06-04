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
                {this.props.children}
            </button>
        )
    }

}

export default Submit.connect()