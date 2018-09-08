import * as React from 'react'
import { reduxForm, InjectedFormProps, SubmissionError } from 'redux-form'

import { StatelessComponent } from '../../Utils'
import { EmailField, Form, Submit, Title } from '../../Forms'
import UserActions from '../Redux/UserActions'

interface IProps {
    strings: IStrings
    getUnauthIdentityByEmail: IFunction<string, Promise<IBaseUser>>
    unauthUser: IBaseUser
    error: Error
}

interface IValues {
    email: string
}

/**
 * Form for get identity of unauth user.
 * There is only email input.
 */
class IdentityForm extends StatelessComponent<IProps & InjectedFormProps<IValues>> {

    private handleSubmit = (data: IValues) => {
        throw new SubmissionError({
            email: 'Test error' // TODO: Remove.
        })
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
        unauthUser: user.unauthUser,
        error: user.getUnauthUserError
    }),
    (dispatch: IDispatch) => ({
        getUnauthIdentityByEmail: (email: string) => dispatch(UserActions.getUnauthUserByEmail(email))
    })
))