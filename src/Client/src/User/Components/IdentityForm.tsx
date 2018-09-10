import * as React from 'react'
import { reduxForm, InjectedFormProps, SubmissionError } from 'redux-form'

import { StatelessComponent } from '../../Utils'
import { EmailField, Form, Submit, Title } from '../../Forms'
import UserActions from '../Redux/UserActions'

interface IProps {
    strings: IStrings
    getUnauthUser: IFunction<string, Promise<IAsyncData<IBaseUser>>>
    unauthUser: IAsyncData<IBaseUser>
}

interface IValues {
    email: string
}

/**
 * Form for get identity of unauth user.
 * There is only email input.
 */
class IdentityForm extends StatelessComponent<IProps & InjectedFormProps<IValues>> {

    /**
     * Get user by email. If exists, redirect to
     * @param {IValues} data
     * @returns {Promise<void>}
     */
    private handleSubmit = async (data: IValues) => {
        const unauthUser = await this.props.getUnauthUser(data.email)

        if (unauthUser.error) {
            throw new SubmissionError({ email: 'Zkontrolujte email.' }) // TODO: Move to strings.
        } else {
            if(unauthUser.payload) {
                alert('FOUND')
            } else {
                alert('NOT FOUNT')
            }
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
                <EmailField
                    label={strings.email}
                    required={strings.missingEmail}
                    invalid={strings.invalidEmail}
                    name='email' />
                <Submit>
                    {strings.submit}
                </Submit>
            </Form>
        )
    }

}

export default reduxForm({
    form: 'identity'
})(IdentityForm.connect(
    ({ form, system, user }: IStoreState) => ({
        strings: system.strings.identity,
        unauthUser: user.unauthUser
    }),
    (dispatch: IDispatch) => ({
        getUnauthUser: (email: string) => dispatch(UserActions.getUnauthUser(email))
    })
))