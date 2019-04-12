import * as React from 'react'
import { InjectedFormProps } from 'redux-form'

import { StatelessComponent } from '../../Utils'
import { Field, Form } from '../../Forms'
import { toggleBodyTypeForm } from '../Redux/PanelActions'
import { addBodyType, updateBodyType } from '../../Universe'

interface IProps {
    strings: Universis.Strings
    toggleBodyTypeForm: Universis.Consumer<boolean>
    addBodyType: Universis.Consumer<Universis.Universe.Body.Type.New>
    updateBodyType: Universis.Consumer2<string, Universis.Universe.Body.Type.New>
    selectedBodyType: Universis.Event
}

interface IValues {
    name: string
    emissiveColor?: string
    particlesGenerator?: string
    texture: string
    virtual?: boolean
}


class BodyTypeForm extends StatelessComponent<IProps & InjectedFormProps<IValues>> {

    public static readonly NAME = 'bodyType'

    /**
     * Add answer.
     * @param data
     */
    private handleSubmit = async (data: IValues) => {
        const { reset, addBodyType, selectedBodyType, updateBodyType } = this.props

        try {
            selectedBodyType ? updateBodyType(selectedBodyType._id, data) : addBodyType(data)
            reset()
        } catch (error) {
            // TODO: Error dialog?
        }
    }

    private renderInnerForm(): React.ReactNode {
        const { strings, toggleBodyTypeForm } = this.props

        return (
            <>
                <Form.FlexRow>
                    <section>
                        <Field
                            label={strings.name}
                            required={strings.name}
                            name='name' />
                        <Field
                            label={strings.emissiveColor}
                            name='emissiveColor' />
                    </section>
                    <section>
                        <Field
                            label={strings.texture}
                            name='texture' />
                    </section>
                </Form.FlexRow>

                <Field
                    label={strings.particlesGenerator}
                    name='particlesGenerator'
                    type={Field.TEXT_AREA} />
                <Form.FlexRow>
                    <Form.Close onClick={() => toggleBodyTypeForm(false)} />
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

export default BodyTypeForm.connect(
    ({ system, universe, panel: { selectedBodyType } }: Universis.Redux.StoreState) => ({
        strings: system.strings.database,
        initialValues: selectedBodyType ? { ...selectedBodyType } : {},
        selectedBodyType
    }),
    { toggleBodyTypeForm, addBodyType, updateBodyType },
    {
        form: BodyTypeForm.NAME,
        enableReinitialize: true
    }
)