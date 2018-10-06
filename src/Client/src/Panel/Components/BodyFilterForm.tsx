import * as React from 'react'
import { reduxForm, InjectedFormProps, formValueSelector } from 'redux-form'

import { StatelessComponent } from '../../Utils'
import { TextField, Form, Select } from '../../Forms'

interface IProps {
    strings: IStrings
}

interface IValues {
    password: string
}

/**
 * Form for login user.
 * There is only password input.
 */
class BodyFilterForm extends StatelessComponent<IProps & InjectedFormProps<IValues>> {

    public static readonly NAME = 'bodyFilter'
    public static readonly SELECTOR = formValueSelector(BodyFilterForm.NAME) // TODO: public static getValue(), private selector, LoginForm extends Form autobind this.selector = selector(this.NAME).

    /**
     * Login user.
     * @param data
     */
    private handleSubmit = async (data: IValues) => {

    }

    public render(): JSX.Element {
        const { strings, handleSubmit, invalid, submitting } = this.props

        const fields = [
            { text: 'Název', value: 'name' },
            { text: 'Equatorial diameter', value: 'diameter_equatorial' }
        ]

        return (
            <Form
                onSubmit={handleSubmit(this.handleSubmit)}
                invalid={invalid}
                sending={submitting}>
                <Select
                    name='field'
                    options={fields}
                    widthEmpty={true} />
                <select>
                    <option>Obsahuje</option>
                    <option>Je roven</option>
                    <option>Je větší než</option>
                    <option>Je menší než</option>
                    <option>Začíná na</option>
                    <option>Končí na</option>
                </select>
                <TextField label={''} name='value' />
            </Form>
        )
    }

}

export default reduxForm({
    form: BodyFilterForm.NAME
})(BodyFilterForm.connect(
    ({ system, user }: IStoreState) => ({}),
    (dispatch: IDispatch) => ({})
))