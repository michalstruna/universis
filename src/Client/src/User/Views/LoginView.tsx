import * as React from 'react'

import { Urls, View } from '../../Utils'
import { LoginForm } from '../../User'

interface IProps {
    unauthUser: IBaseUser,
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
            history.push(Urls.HOME)
        } else if (!unauthUser) {
            history.push(Urls.IDENTITY)
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