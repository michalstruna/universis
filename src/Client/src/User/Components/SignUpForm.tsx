import * as React from 'react'

import { StatelessComponent, Urls } from '../../Utils'
import { PasswordField, Form, Submit, Title } from '../../Forms'
import UserActions from '../Redux/UserActions'
import UnauthIdentity from './UnauthUser'
import Strings from '../../../../Utils/Strings'

interface IProps {
    strings: {
        title: string,
        password: string,
        passwordAgain: string,
        button: string
    }
    form: any
    getUnauthIdentityByEmail: IFunction<string, Promise<IUnauthUser>>
}

/**
 * Form for create new user.
 */
class SignUpForm extends StatelessComponent<IProps> {

    /**
     * After submit send request to server.
     * @param values Values of form. There is only email.
     * @param success Success of form.
     * @param fail Fail of form.
     */
    private handleSubmit = (values: { email: string }, success: IRunnable, fail: IRunnable): void => {
        // TODO
    }

    /**
     * Password again must be same as password.
     * @returns RegExp for password again.
     */
    private getPasswordAgainRegExp(): RegExp {
        const defaultRegExp = /^.{100}$/

        try {
            const { value } = this.props.form.signUp.password

            if(Strings.isPassword(value)) {
                return new RegExp(new RegExp('^' + value + '$'))
            } else {
                return defaultRegExp
            }
        } catch (error) {
            return defaultRegExp
        }
    }

    public render(): JSX.Element {
        const { title, password, passwordAgain, button } = this.props.strings

        return (
            <Form
                name='signUp'
                onSubmit={this.handleSubmit}>
                <Title>
                    {title}
                </Title>
                <UnauthIdentity />
                <PasswordField
                    label={password}
                    name='password' />
                <PasswordField
                    label={passwordAgain}
                    name='passwordAgain'
                    pattern={this.getPasswordAgainRegExp()} />
                <Submit>
                    {button}
                </Submit>
            </Form>
        )
    }

}

export default SignUpForm.connect(
    ({ form, system }: any) => ({
        strings: system.strings.signUp,
        form
    }),
    (dispatch: any) => ({
        getUnauthIdentityByEmail: (email: string) => dispatch(UserActions.getUnauthUserByEmail(email))
    })
)