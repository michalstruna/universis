import * as ClassNames from 'classnames'
import * as React from 'react'
import { Field } from 'redux-form'

import { StatelessComponent } from '../../Utils'

interface IProps {
    name: string
    options: IOption[]
    withEmpty?: string
    disabled?: boolean
    required?: boolean
    label?: string
}

/**
 * Component for rendering select input in form.
 */
class Select extends StatelessComponent<IProps> {

    private renderOptions(): React.ReactNode[] {
        const { options, withEmpty } = this.props

        const result = []

        if (withEmpty) {
            result.push(
                <option key={-1}>
                    {withEmpty}
                </option>
            )
        }

        options.map((option, key) => {
            result.push(
                <option value={option.value} key={key}>
                    {option.text}
                </option>
            )
        })

        return result
    }

    public render(): React.ReactNode {
        const { name, disabled, label, required, options } = this.props
        const blockClassName = ClassNames('form__block', 'form__block--select', { 'form__block--required': !!required })

        return (
            <label className={blockClassName}>
                <Field
                    disabled={disabled}
                    component='select'
                    name={name}
                    value={options && options[0] && options[0].value ? options[0].value : ''}>
                    {this.renderOptions()}
                </Field>
                <p className='form__label'>
                    {label}
                </p>
            </label>
        )
    }

}

export default Select.connect()