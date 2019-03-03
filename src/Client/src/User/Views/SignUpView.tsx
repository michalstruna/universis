import * as React from 'react'

import SignUpForm from '../Components/SignUpForm'
import { View, Url, Urls } from '../../Utils'

interface IProps {
    unauthUser: Universis.Redux.AsyncEntity<Universis.User.Simple>
    identity: Universis.User.Identity
}

/**
 * View for sign up page.
 * There is sign up form.
 */
class SignUpView extends View<IProps> {

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
            <section className={this.getClassName('sign-up')}>
                <SignUpForm />
            </section>
        )
    }

}

export default SignUpView.connect(
    ({ user }: Universis.Redux.StoreState) => ({
        unauthUser: user.unauthUser,
        identity: user.identity.payload
    })
)