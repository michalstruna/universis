import * as React from 'react'
import { Field } from 'redux-form'

import { StatelessComponent } from '../../Utils'

interface IProps {
    name: string
    options: IOption[]
    withEmpty?: boolean
    disabled?: boolean
}

/**
 * Component for rendering select input in form.
 */
class Select extends StatelessComponent<IProps> {

    private renderOptions(): JSX.Element[] {
        const { options, withEmpty } = this.props

        const result = []

        if (withEmpty) {
            result.push(
                <option />
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

    public render(): JSX.Element {
        const { name, disabled } = this.props

        return (
            <Field
                disabled={disabled}
                component='select'
                name={name}>
                {this.renderOptions()}
            </Field>
        )
    }

}

export default Select.connect()