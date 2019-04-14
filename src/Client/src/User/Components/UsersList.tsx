import * as React from 'react'

import UserInfo from './UserInfo'
import { StatelessComponent } from '../../Utils'

interface IProps {
    users: Universis.User.Simple[]
}

/**
 * Component for users list.
 */
class UsersList extends StatelessComponent<IProps> {

    /**
     * Render list of all users in current group.
     * @returns Users.
     */
    private renderUsers(): React.ReactNode[] {
        const { users } = this.props

        return users.map((user, key) => (
            <UserInfo
                type={UserInfo.TYPES.MEDIUM}
                user={user}
                key={key} />
        ))
    }

    public render(): React.ReactNode {
        return (
            <section className='users-list'>
                {this.renderUsers()}
            </section>
        )
    }

}

export default UsersList.connect(
    ({ user }: Universis.Redux.StoreState) => ({
        users: user.onlineUsers
    })
)