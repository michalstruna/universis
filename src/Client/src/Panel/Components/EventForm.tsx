import * as React from 'react'
import { reduxForm, InjectedFormProps, formValueSelector } from 'redux-form'

import { StatelessComponent } from '../../Utils'
import { Field, Form } from '../../Forms'
import { toggleBodyEventForm, clearEvent } from '../Redux/PanelActions'
import { addEvent, updateEvent } from '../../Universe'

interface IProps {
    strings: Universis.Strings
    toggleBodyEventForm: Universis.Consumer<boolean>
    bodyId: string
    addEvent: Universis.Consumer2<string, Universis.Event.New>
    updateEvent: Universis.Consumer2<string, Universis.Event.New>
    newEvent: Universis.Redux.AsyncEntity<Universis.Event>
    clearEvent: Universis.Runnable
    selectedEvent: Universis.Event
}

interface IValues {
    title: string
    content: string
    from: number
    to: number
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
        const { reset, addEvent, bodyId, selectedEvent, updateEvent } = this.props

        try {
            selectedEvent ? updateEvent(selectedEvent._id, data) : addEvent(bodyId, data)
            reset()
        } catch (error) {
            // TODO: Error dialog?
        }
    }

    private renderInnerForm(): React.ReactNode {
        const { newEvent, strings, toggleBodyEventForm, clearEvent } = this.props

        if (newEvent.payload) {
            return (
                <Form.Ok>
                    {strings.ok}
                    <Form.FlexRow>
                        <Form.Close onClick={() => toggleBodyEventForm(false)} />
                        <Form.Back onClick={() => clearEvent()} />
                    </Form.FlexRow>
                </Form.Ok>
            )
        } else {
            return (
                <>
                    <Field
                        label={strings.title}
                        required={strings.title}
                        name='title' />
                    <Field
                        label={strings.from}
                        required={strings.from}
                        name='from'
                        type={Field.NUMBER} />
                    <Field
                        label={strings.to}
                        required={strings.to}
                        name='to'
                        type={Field.NUMBER} />
                    <Field
                        label={strings.description}
                        required={strings.description}
                        name='description'
                        type={Field.TEXT_AREA} />
                    <Form.FlexRow>
                        <Form.Close onClick={() => toggleBodyEventForm(false)} />
                        <Form.Submit />
                    </Form.FlexRow>
                </>
            )
        }
    }

    public render(): React.ReactNode {
        const { handleSubmit, invalid, submitting } = this.props

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

export default EventForm.connect(
    ({ system, universe, panel: { selectedEvent } }: Universis.Redux.StoreState) => ({
        strings: system.strings.events,
        bodyId: universe.body.payload._id,
        newEvent: universe.newEvent,
        initialValues: {
            title: selectedEvent ? selectedEvent.title : '',
            description: selectedEvent ? selectedEvent.description : '',
            from: selectedEvent ? selectedEvent.from : '',
            to: selectedEvent ? selectedEvent.to : ''
        },
        selectedEvent
    }),
    { toggleBodyEventForm, addEvent, clearEvent, updateEvent },
    {
        form: EventForm.NAME,
        enableReinitialize: true
    }
)