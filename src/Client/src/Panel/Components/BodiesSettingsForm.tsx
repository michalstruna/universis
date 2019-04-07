import * as React from 'react'
import { reduxForm, InjectedFormProps, formValueSelector, getFormValues, initialize } from 'redux-form'

import { StatelessComponent, Url, Queries } from '../../Utils'
import { Form, Select } from '../../Forms'

interface IProps {
    strings: Universis.Strings
    values: Universis.Filter
    setValues: Universis.Consumer<Universis.Filter>
    bodies: Universis.Redux.AsyncEntity<Universis.Universe.Body.Simple[]>
}

/**
 * Form for login user.
 * There is only password input.
 */
class BodiesSettingsForm extends StatelessComponent<IProps & InjectedFormProps<Universis.Filter>> {

    public static readonly NAME = 'bodiesSettings'
    public static readonly SELECTOR = formValueSelector(BodiesSettingsForm.NAME) // TODO: public static getValue(), private selector, LoginForm extends Form autobind this.selector = selector(this.NAME).

    public componentDidUpdate(prevProps: IProps): void {
        const { values } = this.props
        Url.replace({ query: { [Queries.BODIES_SETTINGS]: JSON.stringify(values) } })
    }

    /**
     * // TODO: Remove?
     */
    private handleSubmit = async (data: Universis.Filter) => {

    }

    /**
     * Value
     */
    private getValues(): IOption[] {
        const { strings, bodies } = this.props
        const values = [{ text: strings.absoluteValues, value: null }]

        if (bodies.payload) {
            bodies.payload.map(body => (
                values.push({ text: strings.relativeTo + ' ' + body.name, value: body._id })
            ))
        }

        return values
    }

    public render(): React.ReactNode {
        const { handleSubmit, invalid, submitting } = this.props

        return (
            <Form
                onSubmit={handleSubmit(this.handleSubmit)}
                invalid={invalid}
                sending={submitting}>
                <Form.FlexRow>
                    <Select
                        name='valuesType'
                        options={this.getValues()} />
                </Form.FlexRow>
            </Form>
        )
    }

}

export default reduxForm({
    form: BodiesSettingsForm.NAME,
    initialValues: Url.getJsonQuery(Queries.BODIES_SETTINGS) || {}
})(BodiesSettingsForm.connect(
    ({ form, universe, system }: Universis.Redux.StoreState) => ({
        values: getFormValues(BodiesSettingsForm.NAME)({ form }),
        bodies: universe.bodies,
        strings: system.strings.bodies
    }),
    dispatch => ({
        setValues: values => dispatch(initialize(BodiesSettingsForm.NAME, values))
    })
))