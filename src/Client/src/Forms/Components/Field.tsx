import * as ClassNames from 'classnames'
import * as React from 'react'
import { Field as ReduxField } from 'redux-form'

import { StatelessComponent } from '../../Utils'
import Strings from '../../../../Utils/Strings'

interface IType {
    name: string
    validator: Universis.Function<string | number | boolean, boolean>
}

interface IProps {
    name: string
    type?: IType
    label?: string
    validator?: Universis.Function<string | number | boolean, string | undefined>
    required?: string
    invalid?: string
}

/**
 * Form field for any input (text, number, email, password, ...).
 */
class Field extends StatelessComponent<IProps> {

    /**
     * Plain text type.
     */
    public static TEXT = {
        name: 'text',
        validator: value => true
    }

    /**
     * Password input.
     */
    public static PASSWORD = {
        name: 'password',
        validator: Strings.isPassword
    }

    /**
     * Email input.
     */
    public static EMAIL = {
        name: 'email',
        validator: Strings.isEmail
    }

    /**
     * Textarea input.
     */
    public static TEXT_AREA = {
        name: 'textarea',
        validator: value => true
    }

    public static defaultProps = {
        type: Field.TEXT,
        label: ''
    }

    /**
     * Field validator.
     * @param value Current value.
     * @returns Error message or undefined.
     */
    private validator = (value: any) => {
        const { required, invalid, validator, type } = this.props

        if (validator) {
            return validator(value)
        } else if (required && !value) {
            return required
        } else if (!type.validator(value)) {
            return invalid
        }

        return undefined
    }

    /**
     * Render component.
     * @param data
     */
    private renderComponent = (data): React.ReactNode => {
        const { label, type } = this.props
        const { touched, error, value } = data.meta
        const blockClassName = ClassNames('form__block', { 'form__block--error': touched && !!error }, { 'form__block--empty': !data.input.value })
        const inputProps = { ...data.input, autoComplete: 'off', className: 'form__field form__field--' + type.name }

        if (type === Field.TEXT_AREA) {
            return (
                <label className={blockClassName}>
                    <textarea {...inputProps} />
                    <p className='form__label'>
                        {touched && error ? error : label}
                    </p>
                </label>
            )
        }

        return (
            <label className={blockClassName}>
                <input {...inputProps} type={type.name} />
                <p className='form__label'>
                    {touched && error ? error : label}
                </p>
            </label>
        )
    }

    public render(): React.ReactNode {
        const { label, name, type } = this.props

        return (
            <ReduxField
                component={this.renderComponent}
                label={label}
                name={name}
                validate={this.validator}
                type={type} />
        )
    }

}

export default Field