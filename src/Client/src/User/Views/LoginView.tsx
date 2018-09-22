import * as React from 'react'

import LoginForm from '../Components/LoginForm'
import { Url, View } from '../../Utils'

interface IProps {
    unauthUser: IAsyncData<IBaseUser>
    identity: IUserIdentity
}

/**
 * View for login page.
 * There is login form.
 */
class LoginView extends View<IProps> {

    componentWillMount() {
        const { unauthUser, identity } = this.props

        if (identity) {
            Url.replace({ pathname: Url.URLS.HOME })
        } else if (!unauthUser.payload) {
            Url.replace({ pathname: Url.URLS.IDENTITY })
        }
    }

    public render(): JSX.Element {
        return (
            <section className={this.getClassName('login')}>
                <LoginForm />
            </section>
        )
    }

}

export default LoginView.connect(
    ({ user }: IStoreState) => ({
        unauthUser: user.unauthUser,
        identity: user.identity
    })
)