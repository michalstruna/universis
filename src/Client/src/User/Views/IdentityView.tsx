import * as React from 'react'

import { View }  from '../../Utils'
import { IdentityForm } from '../../User'

/**
 * View for home page.
 * There is only menu.
 */
class IdentityView extends View {

    public render(): JSX.Element {
        return (
            <section className={this.getClassName('identity')}>
                <IdentityForm />
            </section>
        )
    }

}

export default IdentityView