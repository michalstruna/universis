import * as React from 'react'

import LoginForm from '../Components/LoginForm'
import { Url, Urls, View } from '../../Utils'

interface IProps {
    unauthUser: Universis.Redux.AsyncEntity<Universis.User.Simple>
    identity: Universis.User.Identity
}

/**
 * View for login page.
 * There is login form.
 */
class LoginView extends View<IProps> {

    componentWillMount() {
        const { unauthUser, identity } = this.props

        if (identity) {
            Url.replace({ pathname: Urls.HOME })
        } else if (!unauthUser.payload) {
            Url.replace({ pathname: Urls.IDENTITY })
        }
    }

    public render(): React.ReactNode {
        return (
            <section className={this.getClassName('login')}>
                <LoginForm />
            </section>
        )
    }

}

export default LoginView.connect(
    ({ user }: Universis.Redux.StoreState) => ({
        unauthUser: user.unauthUser,
        identity: user.identity.payload
    })
)