import * as React from 'react'

import LoginForm from '../Components/LoginForm'
import { Urls, View } from '../../Utils'

interface IProps {
    unauthUser: IAsyncData<IBaseUser>
    isLoggedIn: boolean
}

/**
 * View for login page.
 * There is login form.
 */
class LoginView extends View<IProps> {

    componentWillMount() {
        const { unauthUser, history, isLoggedIn } = this.props

        if (isLoggedIn) {
            history.replace(Urls.HOME)
        } else if (!unauthUser.payload) {
            history.replace(Urls.IDENTITY)
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
        isLoggedIn: user.isLoggedIn
    })
)