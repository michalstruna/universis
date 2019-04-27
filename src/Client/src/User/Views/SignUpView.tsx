import * as React from 'react'

import SignUpForm from '../Components/SignUpForm'
import { View } from '../../Utils'
import { clearUnauthUser } from '../Redux/UserActions'

interface IProps {
    clearUnauthUser: Universis.Runnable
}

/**
 * View for sign up page.
 * There is sign up form.
 */
class SignUpView extends View<IProps> {

    public componentWillUnmount(): void {
        this.props.clearUnauthUser()
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
    }),
    { clearUnauthUser }
)