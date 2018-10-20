import * as React from 'react'
import { reduxForm, InjectedFormProps, formValueSelector, getFormValues, initialize } from 'redux-form'

import { StatelessComponent, Filter, Url } from '../../Utils'
import { TextField, Form, Select, FlexRow } from '../../Forms'
import Arrays from '../../../../Utils/Arrays'

interface IProps {
    strings: IStrings
    values: IFilter
    setValues: IConsumer<IFilter>
}

/**
 * Form for login user.
 * There is only password input.
 */
class BodyFilterForm extends StatelessComponent<IProps & InjectedFormProps<IFilter>> {

    public static readonly NAME = 'bodyFilter'
    public static readonly SELECTOR = formValueSelector(BodyFilterForm.NAME) // TODO: public static getValue(), private selector, LoginForm extends Form autobind this.selector = selector(this.NAME).

    private static FIELDS = [
        { text: 'Název', value: 'name' },
        { text: 'Průměr [km]', value: 'diameter.equatorial' },
        { text: 'Hmotnost [kg]', value: 'mass' },
        { text: 'Hustota [kg/m3]', value: 'density' },
        { text: 'Apocentrum [km]', value: 'orbit.apocenter' },
        { text: 'Pericentrum [km]', value: 'orbit.pericenter' },
        { text: 'Excentricita', value: 'orbit.excentricity' },
        { text: 'Rok [roky]', value: 'orbit.period' },
        { text: 'Den [dny]', value: 'period' }
    ]

    private static RELATION_OPTIONS = [
        { text: 'Obsahuje', value: Filter.RELATIONS.CONTAINS },
        { text: 'Je roven', value: Filter.RELATIONS.EQUALS },
        { text: 'Začíná na', value: Filter.RELATIONS.STARTS_WITH },
        { text: 'Končí na', value: Filter.RELATIONS.ENDS_WITH },
        { text: 'Je větší než', value: Filter.RELATIONS.IS_LARGER },
        { text: 'Je menší než', value: Filter.RELATIONS.IS_SMALLER }
    ]

    public componentDidMount(): void {
        const { setValues } = this.props

        const bodyFilter = Url.getQueryFromUrl(Url.QUERIES.BODY_FILTER) // TODO: Check validity of filter.

        if (bodyFilter) {
            setValues(JSON.parse(bodyFilter))
        } else {
            setValues({
                property: [BodyFilterForm.FIELDS[0].value],
                relation: [BodyFilterForm.RELATION_OPTIONS[0].value],
                value: [''],
            })
        }
    }

    public componentDidUpdate(prevProps: IProps): void {
        const { values } = this.props
        Url.replace({ query: { [Url.QUERIES.BODY_FILTER]: JSON.stringify(values) } })
    }

    /**
     * // TODO: Remove?
     */
    private handleSubmit = async (data: IFilter) => {

    }

    private handleRemoveRow = (event: React.MouseEvent, index: number) => {
        event.preventDefault()
        const { values, setValues } = this.props
        const newFilter = Filter.removeNthRule(values, index)
        setValues(newFilter)
    }

    private renderRows(): React.ReactNodeArray {
        const { values } = this.props
        const rows = []

        let lastFilled = 1

        if (values && values.value) {
            lastFilled = Math.max(1, Arrays.findLastIndex(values.value, value => !!value) + 2)
        }

        for (let i = 0; i < lastFilled; i++) {
            rows.push(
                <FlexRow key={i}>
                    <Select
                        name={`property[${i}]`}
                        options={BodyFilterForm.FIELDS}
                        widthEmpty={true} />
                    <Select
                        name={`relation[${i}]`}
                        options={BodyFilterForm.RELATION_OPTIONS} />
                    <TextField label={''} name={`value[${i}]`} />
                    <button
                        className='form__button--remove'
                        onClick={event => this.handleRemoveRow(event, i)} />
                </FlexRow>
            )
        }

        return rows
    }

    public render(): JSX.Element {
        const { strings, handleSubmit, invalid, submitting } = this.props

        // TODO: Move strings to constants.

        return (
            <Form
                onSubmit={handleSubmit(this.handleSubmit)}
                invalid={invalid}
                sending={submitting}>
                {this.renderRows()}
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
        setValues: values => dispatch(initialize(BodyFilterForm.NAME, values))
    })
))