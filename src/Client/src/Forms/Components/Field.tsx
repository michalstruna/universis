import * as ClassNames from 'classnames'
import * as React from 'react'
import { Field as ReduxField } from 'redux-form'

import { StatelessComponent } from '../../Utils'

export interface ICustomFieldProps {
    label: string
    name: string

    required?: string
    invalid?: string

    validate?: IFunction<string, string | undefined>
}

interface IProps {
    label: string
    name: string
    validate: IFunction<string, string | undefined>
    type: string
}

/**
 * Component for rendering some field input (text, email, ...) in form.
 */
class Field extends StatelessComponent<IProps> {

    private renderComponent = (data): JSX.Element => {
        const { label, type } = this.props
        const { touched, error } = data.meta

        return (
            <label className={ClassNames('form__block', { 'form__block--error': touched && !!error })}>
                <input
                    {...data.input}
                    autoComplete='off'
                    className={'form__field form__field--' + type}
                    type={type}
                />
                <p className='form__label'>
                    {touched && error ? error : label}
                </p>
            </label>
        )
    }

    public render(): JSX.Element {
        const { label, name, type, validate } = this.props

        return (
            <ReduxField
                component={this.renderComponent}
                label={label}
                name={name}
                validate={validate}
                type={type}
            />
        )
    }

}

export default Field.connect()