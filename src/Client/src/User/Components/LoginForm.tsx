import * as React from 'react'
import { reduxForm, InjectedFormProps, SubmissionError } from 'redux-form'

import UserActions from '../Redux/UserActions'
import UserInfo from './UserInfo'
import { StatelessComponent, Url, Link } from '../../Utils'
import { PasswordField, Form, Submit, Title } from '../../Forms'

interface IProps {
    strings: IStrings
    login: IFunction<string, Promise<IAsyncData<IUserIdentity>>>
    unauthUser: IAsyncData<IBaseUser>
}

interface IValues {
    email: string
    password: string
}

/**
 * Form for login user.
 * There is only password input.
 */
class LoginForm extends StatelessComponent<IProps & InjectedFormProps<IValues>> {

    /**
     * Login user.
     * @param data
     */
    private handleSubmit = async (data: IValues) => {
        const { strings, login, history, location } = this.props
        const identity = await login(data.email)

        if (identity.error) {
            throw new SubmissionError({ email: strings.invalidEmail })
        } else {
            history.push(Url.link(location, { pathname: Url.URLS.HOME }))
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
                <Link target={Link.URLS.FORGOT_PASSWORD}>
                    {strings.forgotPassword}
                </Link>
                <Submit>
                    {strings.submit}
                </Submit>
            </Form>
        )
    }

}

export default reduxForm({
    form: 'login'
})(LoginForm.connect(
    ({ system, user }: IStoreState) => ({
        strings: system.strings.login,
        unauthUser: user.unauthUser
    }),
    (dispatch: IDispatch) => ({
        login: (email: string, password: string) => dispatch(UserActions.login(email, password))
    })
))