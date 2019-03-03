import * as React from 'react'
import { reduxForm, InjectedFormProps } from 'redux-form'

import { StatelessComponent } from '../../Utils'
import { Field, Form, Submit } from '../../Forms'
import { addAnswer } from '../../Universe'

interface IProps {
    strings: Universis.Strings
    identity: Universis.Redux.AsyncEntity<Universis.User.Identity>
    form: string,
    addAnswer: Universis.Consumer<Universis.Answer.New>
}

interface IValues {
    content: string
}

/**
 * Form for login user.
 * There is only password input.
 */
class AnswerForm extends StatelessComponent<IProps & InjectedFormProps<IValues>> {

    /**
     * Add answer.
     * @param data
     */
    private handleSubmit = async (data: IValues) => {
        const { strings, identity, form, addAnswer, reset } = this.props

        try {
            addAnswer({ discussionId: form.split('__')[1], content: data.content })
            reset()
        } catch (error) {
        }
    }

    public render(): React.ReactNode {
        const { strings, handleSubmit, invalid, submitting } = this.props

        return (
            <Form
                onSubmit={handleSubmit(this.handleSubmit)}
                invalid={invalid}
                sending={submitting}>
                <Field
                    label={strings.contentLabel}
                    required={strings.missingContent}
                    name='content' />
                <Submit />
            </Form>
        )
    }

}

export default reduxForm({})(AnswerForm.connect(
    ({ system, user }: Universis.Redux.StoreState) => ({
        strings: system.strings.discussion,
        identity: user.identity
    }),
    { addAnswer }
))