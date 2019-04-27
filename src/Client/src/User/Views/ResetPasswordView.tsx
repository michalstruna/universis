import * as React from 'react'

import ResetPasswordForm from '../Components/ResetPasswordForm'
import { View, AsyncEntity, Queries } from '../../Utils'
import Url from '../../Utils/Utils/Url'
import { getUserByToken } from '../Redux/UserActions'

interface IProps {
    user: Universis.Redux.AsyncEntity<Universis.User>
    getUserByToken: Universis.Consumer<string>
    strings: Universis.Strings
}

/**
 * View for sign up page.
 * There is sign up form.
 */
class ResetPasswordView extends View<IProps> {

    componentWillMount() {
        const { user, getUserByToken } = this.props
        const token = Url.getQuery(Queries.TOKEN, location.search)
        AsyncEntity.request(user, () => getUserByToken(token), true)
    }

    public render(): React.ReactNode {
        const { user, strings } = this.props

        return (
            <section className={this.getClassName('reset-password')}>
                <AsyncEntity
                    data={user}
                    success={() => <ResetPasswordForm />}
                    fail={() => strings.error} />
            </section>
        )
    }

}

export default ResetPasswordView.connect(
    ({ user, system }: Universis.Redux.StoreState) => ({
        user: user.userByToken,
        strings: system.strings.resetPassword
    }),
    { getUserByToken }
)