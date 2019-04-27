import * as React from 'react'
import { reduxForm, InjectedFormProps, SubmissionError, formValueSelector } from 'redux-form'

import { login, sendResetPasswordEmail } from '../Redux/UserActions'
import UserInfo from './UserInfo'
import { StatelessComponent, Link, Urls } from '../../Utils'
import { Form, Field } from '../../Forms'

interface IProps {
    strings: Universis.Strings
    login: Universis.Function2<string, string, Promise<Universis.Redux.AsyncEntity<Universis.User.Identity>>>
    unauthUser: Universis.Redux.AsyncEntity<Universis.User.Simple>
    sendResetPasswordEmail: Universis.Consumer<string>
    resetEmail: Universis.Redux.AsyncEntity<any>
}

interface IValues {
    password: string
}

/**
 * Form for login user.
 * There is only password input.
 */
class LoginForm extends StatelessComponent<IProps & InjectedFormProps<IValues>> {

    public static readonly NAME = 'login'
    public static readonly SELECTOR = formValueSelector(LoginForm.NAME) // TODO: public static getValue(), private selector, LoginForm extends Form autobind this.selector = selector(this.NAME).

    /**
     * Login user.
     * @param data
     */
    private handleSubmit = async (data: IValues) => {
        const { strings, login, unauthUser } = this.props

        try {
            await login(unauthUser.payload.email, data.password)
        } catch (error) {
            throw new SubmissionError({ password: strings.invalidPassword })
        }
    }

    /**
     * Handle forgot password send email.
     * @param event
     */
    private handleForgotPassword = (event: React.MouseEvent) => {
        event.preventDefault()

        if (confirm('Odeslat email pro reset hesla?')) {
            const { unauthUser, sendResetPasswordEmail } = this.props
            sendResetPasswordEmail(unauthUser.payload._id)
        }
    }

    public render(): React.ReactNode {
        const { strings, handleSubmit, invalid, submitting, unauthUser, resetEmail } = this.props

        return (
            <Form
                onSubmit={handleSubmit(this.handleSubmit)}
                invalid={invalid}
                sending={submitting || resetEmail.isSent}>
                <Form.Title>
                    {strings.title}
                </Form.Title>
                <UserInfo type={UserInfo.TYPES.LARGE} user={unauthUser.payload} />
                <Field
                    type={Field.PASSWORD}
                    label={strings.password}
                    required={strings.missingPassword}
                    invalid={strings.invalidPassword}
                    name='password' />
                <button className='form__note' onClick={this.handleForgotPassword}>
                    {strings.forgotPassword}
                </button>
                <Form.Back to={Link.URLS.IDENTITY}>
                    {strings.back}
                </Form.Back>
                <Form.Submit>
                    {strings.submit}
                </Form.Submit>
            </Form>
        )
    }

}

export default reduxForm({
    form: LoginForm.NAME
})(LoginForm.connect(
    ({ system, user }: Universis.Redux.StoreState) => ({
        strings: system.strings.login,
        unauthUser: user.unauthUser,
        resetEmail: user.resetEmail
    }),
    { login, sendResetPasswordEmail }
))