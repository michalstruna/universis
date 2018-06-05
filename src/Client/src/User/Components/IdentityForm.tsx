import * as React from 'react'

import { StatelessComponent } from '../../Utils'
import { EmailInput, Form, Submit, Title } from '../../Forms'
import UserActions from '../Redux/UserActions'

interface IProps {
    strings: {
        title: string,
        email: string,
        button: string
    },
    getUnauthIdentityByEmail: (email: string) => Promise<IUnauthUser>
}

/**
 * Form for get identity of unauth user.
 * There is only email input.
 */
class IdentityForm extends StatelessComponent<IProps> {

    /**
     * After submit send request to server.
     * If user exists, redirect to login view.
     * If user don't exists, redirect to register view.
     * @param values Values of form. There is only email.
     * @param success Success of form.
     * @param fail Fail of form.
     */
    private handleSubmit = (values: { email: string }, success: () => void, fail: () => void): void => {
        // TODO: Fix types like () => void.
        this.props.getUnauthIdentityByEmail(values.email)
            .then(user => success())
            .catch(error => fail())
    }

    public render(): JSX.Element {
        const { title, email, button } = this.props.strings

        return (
            <Form
                name='identity'
                onSubmit={this.handleSubmit}>
                <Title>
                    {title}
                </Title>
                <EmailInput
                    label={email}
                    name='email' />
                <Submit>
                    {button}
                </Submit>
            </Form>
        )
    }

}

export default IdentityForm.connect(
    ({ form, system }: any) => ({
        strings: system.strings.identity
    }),
    (dispatch: any) => ({
        getUnauthIdentityByEmail: (email: string) => dispatch(UserActions.getUnauthUserByEmail(email))
    })
)