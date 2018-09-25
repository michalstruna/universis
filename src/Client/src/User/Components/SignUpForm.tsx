import * as React from 'react'
import { reduxForm, InjectedFormProps, SubmissionError, formValueSelector } from 'redux-form'

import UserActions from '../Redux/UserActions'
import UserInfo from './UserInfo'
import { StatelessComponent, Url, Link } from '../../Utils'
import { PasswordField, Form, Submit, Title, Back } from '../../Forms'

interface IProps {
    strings: IStrings
    login: IFunction2<string, string, Promise<IAsyncEntity<IUserIdentity>>>
    unauthUser: IAsyncEntity<IBaseUser>
    password: string
}

interface IValues {
    password: string
}

/**
 * Form for sign up user.
 * There is only password inputs.
 */
class SignUpForm extends StatelessComponent<IProps & InjectedFormProps<IValues>> {

    public static readonly NAME = 'signUp'
    public static readonly SELECTOR = formValueSelector(SignUpForm.NAME)

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
        const { strings, handleSubmit, invalid, submitting, password } = this.props

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
                <PasswordField
                    label={strings.passwordAgain}
                    required={strings.missingPasswordAgain}
                    invalid={strings.invalidPasswordAgain}
                    validate={value => value === password ? undefined : strings.invalidPasswordAgain}
                    name='passwordAgain' />
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
    form: SignUpForm.NAME
})(SignUpForm.connect(
    (state: IStoreState) => ({
        strings: state.system.strings.signUp,
        unauthUser: state.user.unauthUser,
        password: SignUpForm.SELECTOR(state, 'password')
    }),
    (dispatch: IDispatch) => ({
        signUp: (email: string, password: string) => dispatch(UserActions.signUp(email, password))
    })
))