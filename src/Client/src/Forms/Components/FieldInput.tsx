import * as React from 'react'

import { StatelessComponent } from '../../Utils'

export interface IFieldInputProps {
    label: string,
    name: string,
    onChange?: (value: string) => void,
    type?: string,
    value: string
}

/**
 * Component for rendering some field input (text, email, ...) in form.
 */
class FieldInput extends StatelessComponent<IFieldInputProps> {

    public static defaultProps = {
        type: 'text'
    }

    /**
     * After change content of input, update state.
     * @param event
     */
    private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onChange(event.target.value)
    }

    /**
     * Render <input /> element..
     * @return Input.
     */
    private renderInput(): JSX.Element {
        const { name, type, value } = this.props

        return (
            <input
                autoComplete='off'
                className={'form__input form__input--' + type}
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

export default FieldInput.connect()