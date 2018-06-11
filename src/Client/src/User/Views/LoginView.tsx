import * as React from 'react'

import { View }  from '../../Utils'
import { LoginForm } from '../../User'

/**
 * View for login page.
 * There is login form.
 */
class LoginView extends View {

    public render(): JSX.Element {
        return (
            <section className={this.getClassName('login')}>
                <LoginForm />
            </section>
        )
    }

}

export default LoginView