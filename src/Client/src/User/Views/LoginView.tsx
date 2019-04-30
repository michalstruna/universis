import * as React from 'react'

import LoginForm from '../Components/LoginForm'
import { View } from '../../Utils'

interface IProps {
    unauthUser: Universis.Redux.AsyncEntity<Universis.User.Simple>
    identity: Universis.User.Identity
}

/**
 * View for login page.
 * There is login form.
 */
class LoginView extends View<IProps> {

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