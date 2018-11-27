import * as React from 'react'
import { reduxForm, InjectedFormProps, formValueSelector, getFormValues, initialize } from 'redux-form'

import { StatelessComponent, Filter, Url, Queries } from '../../Utils'
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
class BodiesFilterForm extends StatelessComponent<IProps & InjectedFormProps<IFilter>> {

    public static readonly NAME = 'bodyFilter'
    public static readonly SELECTOR = formValueSelector(BodiesFilterForm.NAME) // TODO: public static getValue(), private selector, LoginForm extends Form autobind this.selector = selector(this.NAME).

    // TODO: Move strings to constants. Accessors instead of string key?
    private static FIELDS = [
        { text: 'Název', value: 'name' },
        { text: 'Průměr [km]', value: 'diameter.x' },
        { text: 'Hmotnost [kg]', value: 'mass' },
        { text: 'Hustota [kg/m3]', value: 'density' },
        { text: 'Apocentrum [km]', value: 'orbit.apocenter' },
        { text: 'Pericentrum [km]', value: 'orbit.pericenter' },
        { text: 'Excentricita', value: 'orbit.excentricity' },
        { text: 'Rok [roky]', value: 'orbit.period' },
        { text: 'Den [dny]', value: 'period' },
        { text: 'Satelitů', value: 'diameter.equatorial' },
        { text: 'Prstenců', value: 'diameter.equatorial' },
        { text: 'Sklon', value: 'tilt' },
        { text: 'Rychlost', value: 'orbit.speed' },
        { text: 'Teplota jádra', value: 'innerTemperature' },
        { text: 'Teplota povrchu', value: 'outerTemperature' },
        { text: 'Objev', value: 'discovered' }
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
        const { values } = this.props

        Url.replace({ query: { [Queries.BODIES_FILTER]: JSON.stringify(values) } })

        if (this.getLastFilledIndex(prevProps.values) !== this.getLastFilledIndex(values)) {
            this.updateValues()
        }
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

    private updateValues(filter: IFilter = this.props.values): void {
        const { setValues } = this.props

        setValues(
            Filter.fillFilter(
                filter,
                BodiesFilterForm.FIELDS[0].value,
                BodiesFilterForm.RELATION_OPTIONS[0].value,
                '',
                this.getLastFilledIndex()
            )
        )
    }

    private getLastFilledIndex(values: IFilter = this.props.values): number {
        return values && values.value ? Math.max(1, Arrays.findLastIndex(values.value, value => !!value) + 2) : 1
    }

    private renderRows(): React.ReactNodeArray {
        const rows = []

        const lastFilled = this.getLastFilledIndex()

        for (let i = 0; i < lastFilled; i++) {
            rows.push(
                <FlexRow key={i}>
                    <Select
                        name={`property[${i}]`}
                        options={BodiesFilterForm.FIELDS}
                        widthEmpty={true} />
                    <Select
                        name={`relation[${i}]`}
                        options={BodiesFilterForm.RELATION_OPTIONS} />
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
        const { handleSubmit, invalid, submitting } = this.props

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
    form: BodiesFilterForm.NAME,
    initialValues: Url.getJsonQuery(Queries.BODIES_FILTER) || Filter.getInitialFilter()
})(BodiesFilterForm.connect(
    (state: IStoreState) => ({
        values: getFormValues(BodiesFilterForm.NAME)(state)
    }),
    dispatch => ({
        setValues: values => dispatch(initialize(BodiesFilterForm.NAME, values))
    })
))