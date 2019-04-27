import * as React from 'react'
import { reduxForm, InjectedFormProps, SubmissionError, formValueSelector } from 'redux-form'

import { editUserByToken } from '../Redux/UserActions'
import UserInfo from './UserInfo'
import { StatelessComponent, Url, Link, Queries, Urls } from '../../Utils'
import { Field, Form } from '../../Forms'

interface IProps {
    strings: Universis.Strings
    signUp: Universis.Function2<string, string, Promise<Universis.Redux.AsyncEntity<Universis.User.Identity>>>
    user: Universis.Redux.AsyncEntity<Universis.User.Simple>
    password: string
    editUserByToken: Universis.Consumer2<string, Universis.Map<string>>
}

interface IValues {
    password: string
}

/**
 * Form for sign up user.
 * There is only password inputs.
 */
class ResetPasswordForm extends StatelessComponent<IProps & InjectedFormProps<IValues>> {

    public static readonly NAME = 'signUp'
    public static readonly SELECTOR = formValueSelector(ResetPasswordForm.NAME)

    /**
     * Login user.
     * @param data
     */
    private handleSubmit = async (data: IValues) => {
        const { strings, history } = this.props

        try {
            await editUserByToken(Url.getQuery(Queries.TOKEN), { password: data.password })
            history.replace(Urls.IDENTITY)
        } catch (error) {
            throw new SubmissionError({ password: strings.invalidPassword })
        }
    }

    public render(): React.ReactNode {
        const { strings, handleSubmit, invalid, submitting, password, user } = this.props

        return (
            <Form
                onSubmit={handleSubmit(this.handleSubmit)}
                invalid={invalid}
                sending={submitting}>
                <Form.Title>
                    {strings.title}
                </Form.Title>
                <UserInfo type={UserInfo.TYPES.LARGE} user={user.payload} />
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
                <Form.Back to={Link.URLS.HOME}>
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
    form: ResetPasswordForm.NAME
})(ResetPasswordForm.connect(
    ({ strings, user, system, form }: Universis.Redux.StoreState) => ({
        strings: system.strings.resetPassword,
        user: user.userByToken,
        password: ResetPasswordForm.SELECTOR({ form }, 'password')
    }),
    { editUserByToken }
))