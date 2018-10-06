import * as React from 'react'

import { StatelessComponent } from '../../Utils'
import { UserInfo, Notifications } from '../../User'

interface IProps {
    identity: IAsyncEntity<IUserIdentity>
}

/**
 * Components for overview.
 */
class Overview extends StatelessComponent<IProps> {

    public render(): JSX.Element {
        const { identity } = this.props

        return (
            <section className='panel__overview panel__window'>
                <section className='panel__overview__controls'>
                    <button className='panel__overview__button'>

                    </button>
                    <UserInfo user={identity.payload} type={UserInfo.TYPES.LARGE} />
                    <button className='panel__overview__button panel__overview__button--clean' />
                </section>
                <Notifications />
            </section>
        )
    }

}

export default Overview.connect(
    ({ user }: IStoreState) => ({
        identity: user.identity
    })
)