import * as React from 'react'

import { StatelessComponent, Urls } from '../../Utils'
import { EmailField, Form, Submit, Title } from '../../Forms'
import UserActions from '../Redux/UserActions'

interface IProps {
    strings: {
        title: string,
        email: string,
        button: string
    }
    getUnauthIdentityByEmail: IFunction<string, Promise<IUnauthUser>>
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
    private handleSubmit = (values: { email: string }, success: IRunnable, fail: IRunnable): void => {
        this.props.getUnauthIdentityByEmail(values.email).then(user => {
            success()
            this.props.history.push(user.isSignedUp ? Urls.LOGIN : Urls.SIGN_UP)
        }).catch(error => {
            fail()
        })
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
                <EmailField
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