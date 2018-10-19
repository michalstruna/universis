import * as React from 'react'
import { reduxForm, InjectedFormProps, formValueSelector, getFormValues } from 'redux-form'

import { StatelessComponent, Filter } from '../../Utils'
import { TextField, Form, Select } from '../../Forms'
import PanelActions from '../Redux/PanelActions'

interface IProps {
    strings: IStrings
    values: IValues
    handleChange: IConsumer<IValues>
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

    private static FIELDS = [
        { text: 'Název', value: 'name' },
        { text: 'Průměr', value: 'diameter_equatorial' },
        { text: 'Hmotnost', value: 'mass' },
        { text: 'Hustota', value: 'density' },
        { text: 'Apocentrum', value: 'orbit_apocenter' },
        { text: 'Rok', value: 'orbit_period' },
        { text: 'Den', value: 'period' }
    ]

    private static RELATION_OPTIONS = [
        { text: 'Obsahuje', value: Filter.RELATIONS.CONTAINS },
        { text: 'Je roven', value: Filter.RELATIONS.EQUALS },
        { text: 'Začíná na', value: Filter.RELATIONS.STARTS_WITH },
        { text: 'Končí na', value: Filter.RELATIONS.ENDS_WITH },
        { text: 'Je větší než', value: Filter.RELATIONS.IS_LARGER },
        { text: 'Je menší než', value: Filter.RELATIONS.IS_SMALLER }
    ]

    public componentDidUpdate(prevProps: IProps): void {
        const { values, handleChange } = this.props
        handleChange(values)
    }

    /**
     * // TODO: Remove?
     */
    private handleSubmit = async (data: IValues) => {

    }

    public render(): JSX.Element {
        const { strings, handleSubmit, invalid, submitting } = this.props

        // TODO: Move strings to constants.


        return (
            <Form
                onSubmit={handleSubmit(this.handleSubmit)}
                invalid={invalid}
                sending={submitting}>
                <Select
                    name='property[0]'
                    options={BodyFilterForm.FIELDS}
                    widthEmpty={true} />
                <Select
                    name='relation[0]'
                    options={BodyFilterForm.RELATION_OPTIONS} />
                <TextField label={''} name='value[0]' />
            </Form>
        )
    }

}

export default reduxForm({
    form: BodyFilterForm.NAME
})(BodyFilterForm.connect(
    (state: IStoreState) => ({
        values: getFormValues(BodyFilterForm.NAME)(state)
    }),
    (dispatch: IDispatch) => ({
        handleChange: values => dispatch(PanelActions.setBodyFilter(values))
    })
))