import * as React from 'react'
import { reduxForm, InjectedFormProps, formValueSelector } from 'redux-form'

import StatelessComponent from './StatelessComponent'
import { Field, Form, Submit } from '../../Forms'

interface IProps {
    strings: IStrings
}

interface IValues {
    content: string
}

/**
 * Form for login user.
 * There is only password input.
 */
class EventForm extends StatelessComponent<IProps & InjectedFormProps<IValues>> {

    public static readonly NAME = 'event'
    public static readonly SELECTOR = formValueSelector(EventForm.NAME) // TODO: public static getValue(), private selector, LoginForm extends Form autobind this.selector = selector(this.NAME).

    /**
     * Add answer.
     * @param data
     */
    private handleSubmit = async (data: IValues) => {
        const { strings, form, reset } = this.props

        try {
            // addAnswer({ discussionId: form.split('__')[1], content: data.content })
            //reset()
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
                    label={strings.title}
                    required={strings.title}
                    name='title' />
                <Field
                    label={strings.from}
                    required={strings.from}
                    name='from' />
                <Field
                    label={strings.to}
                    required={strings.to}
                    name='to' />
                <Field
                    label={strings.description}
                    required={strings.description}
                    name='description'
                    type={Field.TEXT_AREA} />
                <Submit />
            </Form>
        )
    }

}

export default reduxForm({
    form: EventForm.NAME
})(EventForm.connect(
    ({ system, user }: IStoreState) => ({
        strings: system.strings.events
    })
))