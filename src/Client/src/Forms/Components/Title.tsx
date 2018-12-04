import * as React from 'react'

import { SimpleComponent } from '../../Utils'

/**
 * Component for title of form.
 */
class Title extends SimpleComponent {

    public render(): React.ReactNode {
        return (
            <legend className='form__title'>
                {this.props.children}
            </legend>
        )
    }

}

export default Title.connect()