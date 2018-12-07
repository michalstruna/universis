import * as React from 'react'

import { SimpleComponent } from '../../Utils'

/**
 * Component for flex row of form.
 */
class FlexRow extends SimpleComponent {

    public render(): React.ReactNode {
        return (
            <section className='form__flex-row'>
                {this.props.children}
            </section>
        )
    }

}

export default FlexRow