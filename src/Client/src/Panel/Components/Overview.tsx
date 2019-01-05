import * as React from 'react'

import { StatelessComponent, Link, ToggleLayout } from '../../Utils'
import { UserInfo, Notifications } from '../../User'
import UsersList from '../../User/Components/UsersList'

interface IProps {
    identity: IAsyncEntity<IUserIdentity>
}

/**
 * Components for overview.
 */
class Overview extends StatelessComponent<IProps> {

    public render(): React.ReactNode {
        const { identity } = this.props

        return (
            <section className='panel__overview panel__window'>
                <section className='panel__overview__controls'>
                    <Link
                        target={Link.URLS.IDENTITY}
                        className='panel__overview__button panel__overview__button--login'>
                        Přihlášení
                    </Link>
                    <UserInfo user={identity.payload} type={UserInfo.TYPES.LARGE} />
                    <button className='panel__overview__button panel__overview__button--clean'>
                        Vyčistit
                    </button>
                </section>
                <ToggleLayout>
                    <Notifications />
                    <UsersList />
                </ToggleLayout>
            </section>
        )
    }

}

export default Overview.connect(
    ({ user }: IStoreState) => ({
        identity: user.identity
    })
)