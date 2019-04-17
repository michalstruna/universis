import * as React from 'react'

import { StatelessComponent, Link, ToggleLayout, AsyncEntity } from '../../Utils'
import { UserInfo, getMessages } from '../../User'
import UsersList from '../../User/Components/UsersList'
import Chat from './Chat'
import Config from '../Constants/Config'

interface IProps {
    identity: Universis.Redux.AsyncEntity<Universis.User.Identity>
    users: Universis.User.Simple[]
}

/**
 * Components for overview.
 */
class Overview extends StatelessComponent<IProps> {

    public render(): React.ReactNode {
        const { identity, users } = this.props
        const hosts = users.filter(user => !user)

        return (
            <section className='panel__overview panel__window'>
                <section className='panel__overview__controls'>
                    <Link
                        target={Link.URLS.IDENTITY}
                        className='panel__overview__button panel__overview__button--login'>
                        Přihlášení
                    </Link>
                    <UserInfo user={identity.payload} type={UserInfo.TYPES.LARGE} />
                    <section className='panel__overview__stats'>
                        <div className='panel__overview__stat'>
                            Online
                        </div>
                        <div className='panel__overview__stat'>
                            Přihlášených: {users.length - hosts.length}
                        </div>
                        <div className='panel__overview__stat'>
                            Nepřihlášených: {hosts.length}
                        </div>
                    </section>
                </section>
                <ToggleLayout>
                    <Chat />
                    <UsersList />
                </ToggleLayout>
            </section>
        )
    }

}

export default Overview.connect(
    ({ user }: Universis.Redux.StoreState) => ({
        identity: user.identity,
        users: user.onlineUsers
    })
)