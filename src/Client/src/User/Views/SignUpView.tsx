import * as React from 'react'

import SignUpForm from '../Components/SignUpForm'
import { View, Url } from '../../Utils'

interface IProps {
    unauthUser: IAsyncEntity<IBaseUser>
    identity: IUserIdentity
}

/**
 * View for sign up page.
 * There is sign up form.
 */
class SignUpView extends View<IProps> {

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
            <section className={this.getClassName('sign-up')}>
                <SignUpForm />
            </section>
        )
    }

}

export default SignUpView.connect(
    ({ user }: IStoreState) => ({
        unauthUser: user.unauthUser,
        identity: user.identity.payload
    })
)