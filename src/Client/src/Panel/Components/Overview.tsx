import * as React from 'react'

import { SimpleComponent } from '../../Utils'
import { UserInfo, Notifications } from '../../User'

/**
 * Components for overview.
 */
class Overview extends SimpleComponent {

    public render(): JSX.Element {
        return (
            <section className='panel__overview panel__window'>
                <section className='panel__overview__controls'>
                    <button className='panel__overview__button'>

                    </button>
                    <UserInfo type={UserInfo.TYPES.LARGE} />
                    <button className='panel__overview__button panel__overview__button--clean' />
                </section>
                <Notifications />
            </section>
        )
    }

}

export default Overview.connect()