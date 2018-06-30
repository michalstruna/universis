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
class IdentityForm extends StatelessComponent<IProps> {

    /**
     * Callback for success.
     */
    private onSuccess: IRunnable

    /**
     * Callback for fail.
     */
    private onFail: IRunnable

    public componentDidUpdate(): void {
        this.handleReceiveResponse()
    }

    public shouldComponentUpdate(nextProps: IProps): boolean {
        const isSuccess = !this.props.unauthUser && !!nextProps.unauthUser
        const isFail = !this.props.error && !!nextProps.error
        return isSuccess || isFail
    }

    /**
     * After submit send request to server.
     * If user exists, redirect to login view.
     * If user don't exists, redirect to register view.
     * @param values Values of form. There is only email.
     * @param success Success of form.
     * @param fail Fail of form.
     */
    private handleSubmit = (values: IValues, success: IRunnable, fail: IRunnable): void => {
        this.onSuccess = success
        this.onFail = fail
        this.props.getUnauthIdentityByEmail(values.email)
    }

    private handleReceiveResponse = (): void => {
        const { history, unauthUser, error } = this.props

        if (error) {
            this.onFail()
        } else {
            this.onSuccess()
            history.push(unauthUser._id ? Urls.LOGIN : Urls.SIGN_UP)
        }
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
    ({ form, system, user }: any) => ({
        strings: system.strings.identity,
        unauthUser: user.unauthUser,
        error: user.getUnauthUserError
    }),
    (dispatch: any) => ({
        getUnauthIdentityByEmail: (email: string) => dispatch(UserActions.getUnauthUserByEmail(email))
    })
)