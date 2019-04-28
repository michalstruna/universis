import * as React from 'react'

import { AsyncEntity, View } from '../../Utils'
import { getUser } from '../Redux/UserActions'
import UserDetail from '../Components/UserDetail'

interface IProps {
    user: Universis.Redux.AsyncEntity<Universis.User>
    getUser: Universis.Consumer<string>
}


class UserView extends View<IProps> {

    public componentWillMount(): void {
        const { user, getUser, match } = this.props
        AsyncEntity.request(user, () => getUser(match.params.userId), true)
    }

    public render(): React.ReactNode {
        const { user } = this.props

        return (
            <section className={this.getClassName('user')}>
                <AsyncEntity data={user} success={() => <UserDetail user={user.payload} />} />
            </section>
        )
    }

}

export default UserView.connect(
    ({ user }: Universis.Redux.StoreState) => ({
        user: user.user
    }),
    { getUser }
)