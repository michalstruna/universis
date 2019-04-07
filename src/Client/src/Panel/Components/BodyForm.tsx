import * as React from 'react'
import { InjectedFormProps, formValueSelector } from 'redux-form'

import { StatelessComponent } from '../../Utils'
import { Field, Form, Select } from '../../Forms'
import { toggleBodyForm } from '../Redux/PanelActions'
import { addBody, updateEvent as updateBody } from '../../Universe'

interface IProps {
    strings: Universis.Strings
    toggleBodyForm: Universis.Consumer<boolean>
    selectedBody: Universis.Universe.Body
    addBody: Universis.Consumer<Universis.Universe.Body.New>
    updateBody: Universis.Consumer2<string, Universis.Universe.Body.New>
    bodyTypes: Universis.Redux.AsyncEntity<Universis.Universe.Body.Type[]>
    bodies: Universis.Redux.AsyncEntity<Universis.Universe.Body.Simple[]>
}

interface IValues extends Universis.Universe.Body.New {
    composition: any
}

/**
 * Form for login user.
 * There is only password input.
 */
class BodyForm extends StatelessComponent<IProps & InjectedFormProps<IValues>> {

    public static readonly NAME = 'body'

    /**
     * Add answer.
     * @param data
     */
    private handleSubmit = async (data: IValues) => {
        const { reset, addBody, selectedBody, updateBody } = this.props

        try {
            const result = { ...data } as any

            if (result.composition) {
                result.composition = this.parseComposition(result.composition)
            }

            if (result.atmosphere && result.atmosphere.composition) {
                result.atmosphere.composition = this.parseComposition(result.atmosphere.composition)
            }

            await selectedBody ? updateBody(selectedBody._id, data) : addBody(data)
            reset()
        } catch (error) {
            // TODO: Error dialog?
        }
    }

    private parseComposition = (composition: string) => (
        composition.split(';').map(item => ({
            element: item.split('=')[0],
            percentage: parseFloat(item.split('=')[1])
        }))
    )

    private renderInnerForm(): React.ReactNode {
        const { strings, toggleBodyForm, bodyTypes, bodies } = this.props

        return (
            <>
                <Form.FlexRow>
                    <section>
                        <Field
                            label={strings.name}
                            required={strings.name}
                            name='name' />
                        <label className='form__block'>
                            <Select
                                name='parentId'
                                options={bodies.payload.map(body => ({
                                    text: body.name,
                                    value: body._id
                                }))}
                                withEmpty={strings.centerBody} />
                        </label>
                    </section>
                    <section>
                        <Field
                            type={Field.TEXT_AREA}
                            label={strings.description}
                            name='description' />
                    </section>
                    <section>
                        <label className='form__block'>
                            <Select
                                name='typeId'
                                options={bodyTypes.payload.map(bodyType => ({
                                    text: bodyType.name,
                                    value: bodyType._id
                                }))} />
                        </label>
                        <Field
                            label={strings.texture}
                            name='texture' />
                    </section>
                </Form.FlexRow>
                <Form.FlexRow>
                    <Field
                        label={strings.diameterX}
                        required={strings.diameterX}
                        name='diameter.x'
                        type={Field.NUMBER} />
                    <Field
                        label={strings.diameterY}
                        name='diameter.y'
                        type={Field.NUMBER} />
                    <Field
                        label={strings.diameterZ}
                        name='diameter.z'
                        type={Field.NUMBER} />
                </Form.FlexRow>
                <Form.FlexRow>
                    <Field
                        label={strings.mass}
                        required={strings.mass}
                        name='mass'
                        type={Field.NUMBER} />
                    <Field
                        label={strings.innerTemperature}
                        name='temperature.inner'
                        type={Field.NUMBER} />
                    <Field
                        label={strings.outerTemperature}
                        name='temperature.outer'
                        type={Field.NUMBER} />
                </Form.FlexRow>
                <Form.FlexRow>
                    <Field
                        label={strings.axisPeriod}
                        required={strings.axisPeriod}
                        name='axis.period'
                        type={Field.NUMBER} />
                    <Field
                        label={strings.axisTilt}
                        name='axis.tilt'
                        type={Field.NUMBER} />
                    <Field
                        label={strings.axisInitialDate}
                        name='axis.initialDate' />
                </Form.FlexRow>
                <Form.FlexRow>
                    <Field
                        label={strings.apsis}
                        required={strings.apsis}
                        name='orbit.apsis'
                        type={Field.NUMBER} />
                    <Field
                        label={strings.periapsis}
                        required={strings.periapsis}
                        name='orbit.periapsis'
                        type={Field.NUMBER} />
                    <Field
                        label={strings.eccentricity}
                        name='orbit.eccentricity'
                        type={Field.NUMBER} />
                </Form.FlexRow>
                <Form.FlexRow>
                    <Field
                        label={strings.inclination}
                        name='orbit.inclination'
                        type={Field.NUMBER} />
                    <Field
                        label={strings.rotation}
                        name='orbit.rotation'
                        type={Field.NUMBER} />
                    <Field
                        label={strings.orbitInitialDate}
                        name='orbit.initialDate' />
                </Form.FlexRow>
                <Form.FlexRow>
                    <Field
                        label={strings.absoluteMagnitude}
                        name='magnitude.absolute'
                        type={Field.NUMBER} />
                    <Field
                        label={strings.relativeMagnitude}
                        name='magnitude.relative'
                        type={Field.NUMBER} />
                    <Field
                        label={strings.albedo}
                        name='albedo'
                        type={Field.NUMBER} />
                </Form.FlexRow>
                <Form.FlexRow>
                    <Field
                        label={strings.discoverer}
                        name='discover.author' />
                    <Field
                        label={strings.discover}
                        name='discover.date' />
                    <section />
                </Form.FlexRow>
                <Form.FlexRow>
                    <Field
                        label={strings.pressure}
                        name='atmosphere.pressure'
                        type={Field.NUMBER} />
                    <Field
                        label={strings.atmosphereComposition}
                        name='atmosphere.composition' />
                    <Field
                        label={strings.composition}
                        name='composition' />
                </Form.FlexRow>
                <Form.FlexRow>
                    <Field
                        label={strings.ringMinDiameter}
                        name='rings[0].diameter.min'
                        type={Field.NUMBER} />
                    <Field
                        label={strings.ringMinDiameter}
                        name='rings[0].diameter.max'
                        type={Field.NUMBER} />
                    <Field
                        label={strings.ringTexture}
                        name='rings[0].texture' />
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
        bodyTypes: universe.bodyTypes,
        bodies: universe.bodies,
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