import * as React from 'react'

import { View }  from '../../Utils'
import { SignUpForm } from '../../User'

/**
 * View for sign up page.
 * There is sign up form.
 */
class SignUpView extends View {

    public render(): JSX.Element {
        return (
            <section className={this.getClassName('sign-up')}>
                <SignUpForm />
            </section>
        )
    }

}

export default SignUpView