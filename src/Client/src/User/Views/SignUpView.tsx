import * as React from 'react'

import { View, Urls } from '../../Utils'

interface IProps {
    unauthUser: IAsyncData<IBaseUser>
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
            history.replace(Urls.HOME)
        } else if (!unauthUser.payload) {
            history.replace(Urls.IDENTITY)
        }
    }

    public render(): JSX.Element {
        return (
            <section className={this.getClassName('sign-up')}>

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