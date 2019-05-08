import * as React from 'react'

import { View, AsyncEntity, Queries, Url, Urls } from '../../Utils'
import { editUserByToken } from '../Redux/UserActions'
import { UserRole } from '../../../../Constants'

interface IProps {
    editedUser: Universis.Redux.AsyncEntity<Universis.User>
    editUserByToken: Universis.Consumer2<string, any>
    strings: Universis.Strings
}

class ActivateEmailView extends View<IProps> {

    componentWillMount() {
        const { editedUser, editUserByToken } = this.props
        const token = Url.getQuery(Queries.TOKEN, location.search)
        AsyncEntity.request(editedUser, () => editUserByToken(token, { role: UserRole.AUTHENTICATED }), true)
    }

    public componentDidUpdate(prevProps: IProps): void {
        if (prevProps.editedUser.isSent && !this.props.editedUser.isSent) {
            this.props.history.replace({ pathname: Urls.IDENTITY })
        }
    }

    public render(): React.ReactNode {
        const { editedUser, strings } = this.props

        return (
            <section className={this.getClassName('activate-email')}>
                <AsyncEntity
                    data={editedUser}
                    fail={() => strings.error} />
            </section>
        )
    }

}

export default ActivateEmailView.connect(
    ({ user, system }: Universis.Redux.StoreState) => ({
        editedUser: user.editedUser,
        strings: system.strings.activateEmail
    }),
    { editUserByToken }
)