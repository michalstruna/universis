import * as React from 'react'
import { InjectedFormProps, formValueSelector } from 'redux-form'

import { StatelessComponent } from '../../Utils'
import { Field, Form } from '../../Forms'
import { toggleBodyForm } from '../Redux/PanelActions'
import { addEvent as addBody, updateEvent as updateBody } from '../../Universe'

interface IProps {
    strings: Universis.Strings
    toggleBodyForm: Universis.Consumer<boolean>
    selectedBody: Universis.Universe.Body
    addBody: Universis.Consumer<Universis.Universe.Body.New>
    updateBody: Universis.Consumer2<string, Universis.Universe.Body.New>
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
class BodyForm extends StatelessComponent<IProps & InjectedFormProps<IValues>> {

    public static readonly NAME = 'body'
    public static readonly SELECTOR = formValueSelector(BodyForm.NAME) // TODO: public static getValue(), private selector, LoginForm extends Form autobind this.selector = selector(this.NAME).

    /**
     * Add answer.
     * @param data
     */
    private handleSubmit = async (data: IValues) => {
        const { reset, addBody, selectedBody, updateBody } = this.props

        try {
            selectedBody ? updateBody(selectedBody._id, data) : addBody(data)
            reset()
        } catch (error) {
            // TODO: Error dialog?
        }
    }

    private renderInnerForm(): React.ReactNode {
        const { strings, toggleBodyForm } = this.props

        return (
            <>
                <Form.FlexRow>
                    <section>
                        <Field
                            label={strings.name}
                            required={strings.name}
                            name='name' />
                        <Field
                            label={strings.type}
                            required={strings.type}
                            name='typeId' />
                    </section>
                    <section>
                        <Field
                            type={Field.TEXT_AREA}
                            label={strings.description}
                            name='description' />
                    </section>
                    <section>
                        <Field
                            type={Field.TEXT_AREA}
                            label={strings.texture}
                            required={strings.texture}
                            name='texture' />
                    </section>
                </Form.FlexRow>
                <Form.FlexRow>
                    <Field
                        label={strings.diameterX}
                        required={strings.diameterX}
                        name='diameter.x' />
                    <Field
                        label={strings.diameterY}
                        name='diameter.y' />
                    <Field
                        label={strings.diameterZ}
                        name='diameter.z' />
                </Form.FlexRow>
                <Form.FlexRow>
                    <Field
                        label={strings.mass}
                        required={strings.mass}
                        name='mass' />
                    <Field
                        label={strings.innerTemperature}
                        name='temperature.inner' />
                    <Field
                        label={strings.outerTemperature}
                        name='temperature.outer' />
                </Form.FlexRow>
                <Form.FlexRow>
                    <Field
                        label={strings.axisPeriod}
                        required={strings.axisPeriod}
                        name='axis.period' />
                    <Field
                        label={strings.axisTilt}
                        name='axis.tilt' />
                    <Field
                        label={strings.axisInitialDate}
                        name='axis.initialDate' />
                </Form.FlexRow>
                <Form.FlexRow>
                    <Field
                        label={strings.apsis}
                        required={strings.apsis}
                        name='orbit.apsis' />
                    <Field
                        label={strings.periapsis}
                        required={strings.periapsis}
                        name='orbit.periapsis' />
                    <Field
                        label={strings.eccentricity}
                        name='orbit.eccentricity' />
                </Form.FlexRow>
                <Form.FlexRow>
                    <Field
                        label={strings.inclination}
                        name='orbit.inclination' />
                    <Field
                        label={strings.rotation}
                        name='orbit.rotation' />
                    <Field
                        label={strings.orbitInitialDate}
                        name='orbit.initialDate' />
                </Form.FlexRow>
                <Form.FlexRow>
                    <Field
                        label={strings.absoluteMagnitude}
                        name='orbit.absoluteMagnitude' />
                    <Field
                        label={strings.relativeMagnitude}
                        name='orbit.relativeMagnitude' />
                    <Field
                        label={strings.albedo}
                        name='orbit.albedo' />
                </Form.FlexRow>
                <Form.FlexRow>
                    <Field
                        label={strings.discoverer}
                        name='discover.author' />
                    <Field
                        label={strings.discover}
                        name='discover.date' />
                    <Field
                        label={strings.period}
                        required={strings.period}
                        name='orbit.period' />
                </Form.FlexRow>
                <Form.FlexRow>
                    <Field
                        label={strings.pressure}
                        name='atmosphere.pressure' />
                    <Field
                        label={strings.atmosphereComposition}
                        name='discover.atmosphereComposition' />
                    <Field
                        label={strings.composition}
                        name='orbit.composition' />
                </Form.FlexRow>
                <Form.FlexRow>
                    <Field
                        label={strings.ringMinDiameter}
                        name='rings[].diameter.min' />
                    <Field
                        label={strings.ringMinDiameter}
                        name='rings[].diameter.max' />
                    <Field
                        label={strings.ringTexture}
                        name='rings[].texture' />
                </Form.FlexRow>
                <Form.FlexRow>
                    <Form.Close onClick={() => toggleBodyForm(false)} />
                    <Form.Submit />
                </Form.FlexRow>
            </>
        )
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

export default BodyForm.connect(
    ({ system, universe, panel: { selectedEvent } }: Universis.Redux.StoreState) => ({
        strings: system.strings.body,
        initialValues: {
            title: selectedEvent ? selectedEvent.title : '',
            description: selectedEvent ? selectedEvent.description : '',
            from: selectedEvent ? selectedEvent.from : '',
            to: selectedEvent ? selectedEvent.to : ''
        },
        selectedEvent
    }),
    { toggleBodyForm, addBody, updateBody },
    {
        form: BodyForm.NAME,
        enableReinitialize: true
    }
)