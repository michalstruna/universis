import * as React from 'react'

import { SimpleComponent } from '../../Utils'
import { UserInfo } from '../../User'

/**
 * Components for overview.
 */
class Overview extends SimpleComponent {

    public render(): JSX.Element {
        return (
            <section className='panel__overview'>
                <UserInfo />
            </section>
        )
    }

}

export default Overview.connect()