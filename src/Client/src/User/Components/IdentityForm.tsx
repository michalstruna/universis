import * as React from 'react'
import { reduxForm, InjectedFormProps } from 'redux-form'

import { StatelessComponent } from '../../Utils'
import { Form, Field } from '../../Forms'
import { getUnauthUser } from '../Redux/UserActions'

interface IProps {
    strings: Universis.Strings
    getUnauthUser: Universis.Function<string, Promise<Universis.Redux.AsyncEntity<Universis.User.Simple>>>
    unauthUser: Universis.Redux.AsyncEntity<Universis.User.Simple>
}

interface IValues {
    email: string
}

/**
 * Form for getAll identity of unauth user.
 * There is only email input.
 */
class IdentityForm extends StatelessComponent<IProps & InjectedFormProps<IValues>> {

    /**
     * Get user by email. If exists, redirect to login, else to sign up.
     * @param data
     */
    private handleSubmit = (data: IValues) => {
        this.props.getUnauthUser(data.email)
    }

    public render(): React.ReactNode {
        const { strings, handleSubmit, invalid, submitting } = this.props

        return (
            <Form
                onSubmit={handleSubmit(this.handleSubmit)}
                invalid={invalid}
                sending={submitting}>
                <Form.Title>
                    {strings.title}
                </Form.Title>
                <Field
                    type={Field.EMAIL}
                    label={strings.email}
                    required={strings.missingEmail}
                    invalid={strings.invalidEmail}
                    name='email' />
                <Form.Submit>
                    {strings.submit}
                </Form.Submit>
            </Form>
        )
    }

}

export default reduxForm({
    form: 'identity'
})(IdentityForm.connect(
    ({ system, user }: Universis.Redux.StoreState) => ({
        strings: system.strings.identity,
        unauthUser: user.unauthUser
    }),
    { getUnauthUser }
))