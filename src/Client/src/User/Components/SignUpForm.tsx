import * as React from 'react'
import { reduxForm, InjectedFormProps, SubmissionError, formValueSelector } from 'redux-form'

import { signUp } from '../Redux/UserActions'
import UserInfo from './UserInfo'
import { StatelessComponent, Url, Link } from '../../Utils'
import { Field, Form } from '../../Forms'

interface IProps {
    strings: Universis.Strings
    signUp: Universis.Function2<string, string, Promise<Universis.Redux.AsyncEntity<Universis.User.Identity>>>
    unauthUser: Universis.Redux.AsyncEntity<Universis.User.Simple>
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
                <Form.Title>
                    {strings.title}
                </Form.Title>
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
    form: SignUpForm.NAME
})(SignUpForm.connect(
    (state: Universis.Redux.StoreState) => ({
        strings: state.system.strings.signUp,
        unauthUser: state.user.unauthUser,
        password: SignUpForm.SELECTOR(state, 'password')
    }),
    { signUp }
))