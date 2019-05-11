import * as React from 'react'
import { InjectedFormProps, getFormValues } from 'redux-form'

import { StatelessComponent } from '../../Utils'
import { Field, Form, Select } from '../../Forms'
import { toggleBodyForm } from '../Redux/PanelActions'
import { addBody, updateBody } from '../../Universe'

interface IProps {
    strings: Universis.Strings
    toggleBodyForm: Universis.Consumer<boolean>
    selectedBody: Universis.Universe.Body
    addBody: Universis.Consumer<Universis.Universe.Body.New>
    updateBody: Universis.Consumer2<string, Universis.Universe.Body.New>
    bodyTypes: Universis.Redux.AsyncEntity<Universis.Universe.Body.Type[]>
    bodies: Universis.Redux.AsyncEntity<Universis.Universe.Body.Simple[]>
    currentValues: IValues
}

interface IValues extends Universis.Universe.Body.New {
    composition: any
    move: string
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
        const { reset, addBody, selectedBody, updateBody, bodyTypes } = this.props

        try {
            let result = { ...data } as any

            if (result.composition) {
                result.composition = this.parseComposition(result.composition)
            } else {
                result.composition = []
            }

            if (result.atmosphere && result.atmosphere.composition) {
                result.atmosphere.composition = this.parseComposition(result.atmosphere.composition)
            } else {
                if (!result.atmosphere) {
                    result.atmosphere = {}
                }

                result.atmosphere.composition = []
            }

            result = Form.getFormData(result)

            await (selectedBody ? updateBody(selectedBody._id, result) : addBody(result))
            reset()
        } catch (error) {
            // TODO: Error dialog?
        }
    }

    private renderTexture(): React.ReactNode {
        const { strings, selectedBody, currentValues, bodyTypes } = this.props

        const bodyType = bodyTypes.payload.find(bodyType => bodyType._id === currentValues.typeId)

        if (bodyType.particlesGenerator) {
            return (
                <>
                    <Field
                        label={strings.particlesCount}
                        name='particles.count'
                        type={Field.NUMBER} />
                    <Field
                        label={strings.particlesSize}
                        name='particles.size'
                        type={Field.NUMBER} />
                    <Field
                        label={strings.particlesThickness}
                        name='particles.thickness'
                        type={Field.NUMBER} />
                </>
            )
        } else {
            return (
                <Field
                    label={strings.texture}
                    type={Field.IMAGE}
                    preview={selectedBody ? `/${selectedBody.texture}` : null}
                    name='texture' />
            )
        }

    }

    private renderMove(): React.ReactNode {
        const { strings, currentValues } = this.props

        if (currentValues.move === '1') {
            return (
                <>
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
                            type={Field.NUMBER}
                            name='orbit.initialDate' />
                    </Form.FlexRow>
                </>
            )
        } else {
            return (
                <Form.FlexRow>
                    <Field
                        label={strings.alpha}
                        name='position.alpha'
                        required={strings.alpha}
                        type={Field.NUMBER} />
                    <Field
                        label={strings.beta}
                        required={strings.beta}
                        name='position.beta'
                        type={Field.NUMBER} />
                    <Field
                        label={strings.distance}
                        required={strings.distance}
                        type={Field.NUMBER}
                        name='position.distance' />
                </Form.FlexRow>
            )
        }
    }

    private parseComposition = (composition: string) => (
        composition.split(';').filter(item => !!item).map(item => ({
            element: item.split('=')[0],
            percentage: parseFloat(item.split('=')[1])
        }))
    )

    private renderInnerForm(): React.ReactNode {
        const { strings, toggleBodyForm, bodyTypes, bodies, selectedBody, currentValues } = this.props

        if (!currentValues) {
            return null
        }

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
                                label={strings.parent}
                                options={bodies.payload.map(body => ({
                                    text: body.name,
                                    value: body._id
                                }))} />
                        </label>
                        <label className='form__block'>
                            <Select
                                name='typeId'
                                label={strings.type}
                                required={strings.type}
                                options={bodyTypes.payload.map(bodyType => ({
                                    text: bodyType.name,
                                    value: bodyType._id
                                }))} />
                        </label>
                    </section>
                    <section>
                        <Field
                            type={Field.TEXT_AREA}
                            label={strings.description}
                            name='description' />
                        <Select
                            name='move'
                            label={strings.move}
                            required={strings.move}
                            options={[
                                { text: 'Periodický', value: 1 },
                                { text: 'Statický', value: 0 }
                            ]} />
                    </section>
                    <section>
                        {this.renderTexture()}
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
                {this.renderMove()}
                <Form.FlexRow>
                    <Field
                        label={strings.axisPeriod}
                        name='axis.period'
                        type={Field.NUMBER} />
                    <Field
                        label={strings.axisTilt}
                        name='axis.tilt'
                        type={Field.NUMBER} />
                    <Field
                        label={strings.axisInitialDate}
                        type={Field.NUMBER}
                        name='axis.initialDate' />
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
                        label={strings.atmosphereComposition}
                        name='atmosphere.composition' />
                    <Field
                        label={strings.composition}
                        name='composition' />
                </Form.FlexRow>
                <Form.FlexRow>
                    <Field
                        label={strings.pressure}
                        name='atmosphere.pressure'
                        type={Field.NUMBER} />
                    <Field
                        label={strings.discoverer}
                        name='discover.author' />
                    <Field
                        label={strings.discover}
                        name='discover.date' />
                </Form.FlexRow>
                <Form.FlexRow>
                    <Field
                        label={strings.ringMinDiameter}
                        name='rings[0].diameter.min'
                        type={Field.NUMBER} />
                    <Field
                        label={strings.ringMaxDiameter}
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

const parseComposition = (composition: any[]): string => (
    composition.reduce((result, item) => ([...result, `${item.element}=${item.percentage}`]), []).join(';')
)

export default BodyForm.connect(
    ({ system, universe, panel: { selectedBody }, form }: Universis.Redux.StoreState) => ({
        strings: system.strings.body,
        bodyTypes: universe.bodyTypes,
        bodies: universe.bodies,
        initialValues: selectedBody ? {
            ...selectedBody,
            typeId: selectedBody.type._id,
            composition: selectedBody.composition ? parseComposition(selectedBody.composition) : null,
            atmosphere: selectedBody.atmosphere ? {
                ...selectedBody.atmosphere,
                composition: selectedBody.atmosphere.composition ? parseComposition(selectedBody.atmosphere.composition) : null
            } : null,
            move: selectedBody.orbit ? '1' : '0'
        } : {
            typeId: universe.bodyTypes.payload && universe.bodyTypes.payload[0] ? universe.bodyTypes.payload[0]._id : null,
            parentId: universe.bodies.payload && universe.bodies.payload[0] ? universe.bodies.payload[0]._id : null,
            move: '1'
        },
        selectedBody,
        currentValues: getFormValues(BodyForm.NAME)({ form })
    }),
    { toggleBodyForm, addBody, updateBody },
    {
        form: BodyForm.NAME,
        enableReinitialize: true
    }
)