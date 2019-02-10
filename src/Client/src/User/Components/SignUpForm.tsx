import * as React from 'react'
import { reduxForm, InjectedFormProps, SubmissionError, formValueSelector } from 'redux-form'

import { signUp } from '../Redux/UserActions'
import UserInfo from './UserInfo'
import { StatelessComponent, Url, Link } from '../../Utils'
import { Field, Form, Submit, Title, Back } from '../../Forms'

interface IProps {
    strings: IStrings
    signUp: IFunction2<string, string, Promise<IAsyncEntity<IUserIdentity>>>
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
        const { strings, signUp, unauthUser } = this.props

        try {
            await signUp(unauthUser.payload.email, data.password)
        } catch (error) {
            throw new SubmissionError({ password: strings.invalidPassword })
        }
    }

    public render(): React.ReactNode {
        const { strings, handleSubmit, invalid, submitting, password, unauthUser } = this.props

        return (
            <Form
                onSubmit={handleSubmit(this.handleSubmit)}
                invalid={invalid}
                sending={submitting}>
                <Title>
                    {strings.title}
                </Title>
                <UserInfo type={UserInfo.TYPES.LARGE} user={{
                    ...UserInfo.DEFAULT_USER
                }} />
                <Field
                    type={Field.PASSWORD}
                    label={strings.password}
                    required={strings.missingPassword}
                    invalid={strings.invalidPassword}
                    name='password' />
                <Field
                    type={Field.PASSWORD}
                    label={strings.passwordAgain}
                    required={strings.missingPasswordAgain}
                    invalid={strings.invalidPasswordAgain}
                    validator={value => value === password ? undefined : strings.invalidPasswordAgain}
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
    { signUp }
))