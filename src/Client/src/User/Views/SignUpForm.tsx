import * as React from 'react'

import { View, Urls } from '../../Utils'
import { SignUpForm } from '../../User'

interface IProps {
    unauthUser: IBaseUser,
    isLoggedIn: boolean
}

/**
 * View for sign up page.
 * There is sign up form.
 */
class SignUpView extends View<IProps> {

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
            <section className={this.getClassName('sign-up')}>
                <SignUpForm />
            </section>
        )
    }

}

export default SignUpView.connect(
    ({ user }: IStoreState) => ({
        unauthUser: user.unauthUser,
        isLoggedIn: user.isLoggedIn
    })
)