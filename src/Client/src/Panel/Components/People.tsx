import * as React from 'react'

import { SimpleComponent } from '../../Utils'
import { UsersList } from '../../User'

/**
 * Components for people list.
 */
class People extends SimpleComponent {

    public render(): React.ReactNode {
        return (
            <section className='panel__people panel__window'>
                <section className='panel__people--inner'>
                    <UsersList />
                </section>
            </section>
        )
    }

}

export default People.connect()