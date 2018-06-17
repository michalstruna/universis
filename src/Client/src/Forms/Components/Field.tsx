import * as ClassNames from 'classnames'
import * as React from 'react'

import { StatelessComponent } from '../../Utils'

export interface IFieldInputProps {
    label: string
    name: string
    onChange?: IDoubleConsumer<string, boolean>
    type?: string
    value?: string
    defaultValue?: string
    isValid?: boolean
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
        const { onChange, defaultValue } = this.props
        onChange(defaultValue, this.isValid(defaultValue))
    }

    public componentDidUpdate(prevProps): void {
        const { pattern, onChange, value } = this.props

        if (prevProps.pattern.toString() !== pattern.toString()) {
            onChange(value, this.isValid(value))
        }
    }

    /**
     * Check if content of field is valid.
     * @param text
     * @returns Text is valid.
     */
    private isValid(text: string): boolean {
        const { pattern } = this.props
        return pattern ? pattern.test(text) : true
    }

    /**
     * After change content of input, update state.
     * @param event
     */
    private handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target
        this.props.onChange(value, this.isValid(value))
    }

    /**
     * Render <input /> element.
     * @return Input.
     */
    private renderInput(): JSX.Element {
        const { name, type, value } = this.props

        const className = ClassNames(
            'form__input',
            'form__input--' + type,
            { 'form__input--invalid': !this.isValid(value) }
        )

        return (
            <input
                autoComplete='off'
                className={className}
                name={name}
                onChange={this.handleChange}
                type={type}
                value={value}
                ref='input' />
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