import * as ClassNames from 'classnames'
import * as React from 'react'

import { StatelessComponent } from '../../Utils'

export interface IFieldInputProps {
    label: string,
    name: string,
    onChange?: (value: string, isValid: boolean) => void,
    type?: string,
    value?: string,
    defaultValue?: string
    isValid?: boolean,
    pattern?: RegExp
}

/**
 * Component for rendering some field input (text, email, ...) in form.
 */
class Field extends StatelessComponent<IFieldInputProps> {

    public static defaultProps = {
        type: 'text'
    }

    public componentDidMount(): void {
        const { onChange, pattern, defaultValue } = this.props
        const isValid = pattern ? pattern.test(defaultValue) : true
        onChange(defaultValue, isValid)
    }

    /**
     * After change content of input, update state.
     * @param event
     */
    private handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { onChange, pattern } = this.props
        const { value } = event.target
        const isValid = pattern ? pattern.test(value) : true
        onChange(value, isValid)
    }

    /**
     * Render <input /> element.
     * @return Input.
     */
    private renderInput(): JSX.Element {
        const { name, pattern, type, value } = this.props

        const className = ClassNames(
            'form__input',
            'form__input--' + type,
            { 'form__input--invalid': pattern ? !pattern.test(value) : false }
        )

        return (
            <input
                autoComplete='off'
                className={className}
                name={name}
                onChange={this.handleChange}
                type={type}
                value={value} />
        )
    }

    /**
     * Render <p>element  with label.
     * @return Label.
     */
    private renderLabel(): JSX.Element {
        return (
            <p className='form__label'>
                {this.props.label}
            </p>
        )
    }

    public render(): JSX.Element {
        return (
            <label
                className='form__block'
                key={this.props.name}>
                {this.renderInput()}
                {this.renderLabel()}
            </label>
        )
    }

}

export default Field.connect()