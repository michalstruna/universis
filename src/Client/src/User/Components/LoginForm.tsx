import * as React from 'react'

import { Link, StatelessComponent } from '../../Utils'
import { PasswordField, Form, Note, Submit, Title } from '../../Forms'
import UserActions from '../Redux/UserActions'
import UnauthIdentity from './UnauthUser'

interface IProps {
    strings: {
        title: string,
        password: string,
        button: string,
        forgot: string
    }
    login: IDoubleConsumer<string, string>
}

/**
 * Form for login user.
 * There is only password input.
 */
class LoginForm extends StatelessComponent<IProps> {

    /**
     * After submit send request to server.
     * @param values Values of form. There is only email.
     * @param success Success of form.
     * @param fail Fail of form.
     */
    private handleSubmit = (values: { email: string }, success: IRunnable, fail: IRunnable): void => {
        // TODO: Login.
        // TODO: Forgot password. Alert? Link?
    }

    public render(): JSX.Element {
        const { title, password, button, forgot } = this.props.strings

        return (
            <Form
                name='login'
                onSubmit={this.handleSubmit}>
                <Title>
                    {title}
                </Title>
                <UnauthIdentity />
                <PasswordField
                    label={password}
                    name='password' />
                <Note>
                    <Link target={Link.URLS.HOME}>
                        {forgot}
                    </Link>
                </Note>
                <Submit>
                    {button}
                </Submit>
            </Form>
        )
    }

}

export default LoginForm.connect(
    ({ form, system }: any) => ({
        strings: system.strings.login
    }),
    (dispatch: any) => ({
        login: (email: string, password: string) => dispatch(UserActions.login(email, password))
    })
)