import * as React from 'react'

import UserInfo from './UserInfo'
import { StatelessComponent } from '../../Utils'

interface IProps {

}

/**
 * Component for users list.
 */
class UsersList extends StatelessComponent<IProps> {

    /**
     * Render list of all users in current group.
     * @returns Users.
     */
    private renderUsers(): JSX.Element[] {
        const users = []

        for (let i = 0; i < 50; i++) {
            users.push(
                <UserInfo
                    type={UserInfo.TYPES.MEDIUM}
                    key={i} />
            )
        }

        return users
    }

    public render(): JSX.Element {
        return (
            <section className='users-list'>
                {this.renderUsers()}
            </section>
        )
    }

}

export default UsersList