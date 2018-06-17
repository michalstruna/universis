import * as React from 'react'

import { View }  from '../../Utils'
import { IdentityForm } from '../../User'

/**
 * View for identity page.
 * There is identity form.
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