import * as React from 'react'
import { reduxForm, InjectedFormProps } from 'redux-form'

import { StatelessComponent } from '../../Utils'
import { EmailField, Form, Submit, Title } from '../../Forms'
import UserActions from '../Redux/UserActions'

interface IProps {
    strings: IStrings
    getUnauthIdentity: IFunction<string, Promise<IBaseUser>>
    unauthUser: IAsyncData<any> // TODO: ISimpleUser.
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
        this.props.getUnauthIdentity(data.email)
    }

    public render(): JSX.Element {
        const { strings, handleSubmit, invalid, submitting} = this.props

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
        getUnauthIdentity: (email: string) => dispatch(UserActions.getUnauthUser(email))
    })
))