import * as React from 'react'

import { SimpleComponent } from '../../Utils'

/**
 * Component for note of form.
 */
class Note extends SimpleComponent {

    public render(): JSX.Element {
        return (
            <section className='form__note'>
                {this.props.children}
            </section>
        )
    }

}

export default Note.connect()