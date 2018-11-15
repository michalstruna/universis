import * as React from 'react'
import { reduxForm, InjectedFormProps, SubmissionError, formValueSelector } from 'redux-form'

import { login } from '../Redux/UserActions'
import UserInfo from './UserInfo'
import { StatelessComponent, Url, Link } from '../../Utils'
import { PasswordField, Form, Submit, Title, Back } from '../../Forms'

interface IProps {
    strings: IStrings
    login: IFunction2<string, string, Promise<IAsyncEntity<IUserIdentity>>>
    unauthUser: IAsyncEntity<IBaseUser>
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

    public render(): JSX.Element {
        const { strings, handleSubmit, invalid, submitting } = this.props

        return (
            <Form
                onSubmit={handleSubmit(this.handleSubmit)}
                invalid={invalid}
                sending={submitting}>
                <Title>
                    {strings.title}
                </Title>
                <UserInfo type={UserInfo.TYPES.LARGE} />
                <PasswordField
                    label={strings.password}
                    required={strings.missingPassword}
                    invalid={strings.invalidPassword}
                    name='password' />
                <Back to={Link.URLS.IDENTITY}>
                    {strings.back}
                </Back>
                <Submit>
                    {strings.submit}
                </Submit>
            </Form>
        )
    }

}

export default reduxForm({
    form: LoginForm.NAME
})(LoginForm.connect(
    ({ system, user }: IStoreState) => ({
        strings: system.strings.login,
        unauthUser: user.unauthUser
    }),
    { login }
))