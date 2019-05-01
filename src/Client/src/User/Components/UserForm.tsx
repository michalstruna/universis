import * as React from 'react'
import { InjectedFormProps, formValueSelector } from 'redux-form'

import { StatelessComponent } from '../../Utils'
import { Field, Form, Select } from '../../Forms'
import { toggleUserForm, updateUser } from '../Redux/UserActions'
import { UserRole } from '../../../../Constants'

interface IProps {
    strings: Universis.Strings
    updateUser: Universis.Consumer2<string, Universis.User.New>
    user: Universis.Redux.AsyncEntity<Universis.User>
    toggleUserForm: Universis.Consumer<boolean>
    identity: Universis.Redux.AsyncEntity<Universis.User.Identity>
}

interface IValues extends Universis.User.New {

}

class UserForm extends StatelessComponent<IProps & InjectedFormProps<IValues>> {

    public static readonly NAME = 'user'
    public static readonly SELECTOR = formValueSelector(UserForm.NAME)

    /**
     * Edit user.
     * @param data
     */
    private handleSubmit = async (data: IValues) => {
        const { reset, user, updateUser } = this.props

        try {
            const isFemale: any = data.isFemale

            console.log(isFemale)

            data.isFemale = ((isFemale === 'true' || isFemale === true) ? true : ((isFemale === 'false' || isFemale === false) ? false : null))

            await updateUser(user.payload._id, data)
            reset()
        } catch {

        }
    }

    private renderInnerForm(): React.ReactNode {
        const { strings, toggleUserForm } = this.props

        return (
            <>
                <Form.FlexRow>
                    <Field
                        label={strings.name}
                        name='name'
                        required={strings.name} />
                    <Field
                        label={strings.publicEmail}
                        name='publicEmail'
                        type={Field.EMAIL} />
                </Form.FlexRow>
                <Form.FlexRow>
                    <Field
                        label={strings.born}
                        name='born'
                        type={Field.DATE} />
                    <Select
                        name='isFemale'
                        options={[
                            { value: '', text: 'Nechci uvádět' },
                            { value: 'true', text: 'Žena' },
                            { value: 'false', text: 'Muž' }
                        ]}
                        label={strings.sex} />
                </Form.FlexRow>
                <Form.FlexRow>
                    <Field
                        label={strings.website}
                        name='website' />
                    <Field
                        label={strings.facebook}
                        name='facebook' />
                </Form.FlexRow>
                <Field
                    label={strings.about}
                    name='about'
                    type={Field.TEXT_AREA} />
                <Form.FlexRow>
                    <Field
                        label={strings.password}
                        name='password'
                        invalid={strings.invalidPassword}
                        type={Field.PASSWORD} />
                    <Field
                        label={strings.home}
                        name='home' />
                </Form.FlexRow>
                {this.renderRole()}
                <Form.FlexRow>
                    <Form.Close onClick={() => toggleUserForm(false)} />
                    <Form.Submit />
                </Form.FlexRow>
            </>
        )
    }

    private renderRole(): React.ReactNode {
        const { strings, identity, user } = this.props

        if (identity.payload && identity.payload.role === UserRole.ADMIN && identity.payload._id !== user.payload._id) {
            return (
                <Select
                    name='role'
                    required={strings.role}
                    options={[
                        { value: UserRole.AUTHENTICATED, text: strings.authenticated },
                        { value: UserRole.ADMIN, text: strings.admin }
                    ]}
                    label={strings.role} />
            )
        }
    }

    public render(): React.ReactNode {
        const { handleSubmit, invalid, submitting } = this.props

        console.log(this.props.initialValues)

        return (
            <Form
                onSubmit={handleSubmit(this.handleSubmit)}
                invalid={invalid}
                sending={submitting}>
                {this.renderInnerForm()}
            </Form>
        )
    }

}

const getInitialValues = (user: Universis.User) => {
    if (!user) {
        return null
    }

    const { name, publicEmail, facebook, isFemale, website, role, about, avatar, born, home } = user
    return { name, publicEmail, facebook, isFemale, website, role, about, avatar, born, home }
}

export default UserForm.connect(
    ({ system, user }: Universis.Redux.StoreState) => ({
        strings: system.strings.user,
        initialValues: getInitialValues(user.user.payload),
        user: user.user,
        identity: user.identity
    }),
    { toggleUserForm, updateUser },
    {
        form: UserForm.NAME,
        enableReinitialize: true
    }
)