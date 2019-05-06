import * as ClassNames from 'classnames'
import * as React from 'react'
import { Field as ReduxField } from 'redux-form'

import { Component } from '../../Utils'
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
    preview?: string
}

interface IState {
    preview: any
}

/**
 * Form field for any input (text, number, email, password, ...).
 */
class Field extends Component<IProps, IState> {

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

    /**
     * Number input.
     */
    public static NUMBER = {
        name: 'number',
        validator: value => /^[0-9]*$/.test(value)
    }

    /**
     * Date input.
     */
    public static DATE = {
        name: 'date',
        validator: value => /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(value)
    }

    public static IMAGE = {
        name: 'file',
        validator: value => true
    }

    public static defaultProps = {
        type: Field.TEXT,
        label: ''
    }

    private file: HTMLInputElement

    public constructor(props) {
        super(props)

        this.state = {
            preview: this.props.preview
        }
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


    private handleChangeImage = () => {
        const reader = new FileReader()

        reader.onload = event => {
            this.setState({ preview: (event.target as any).result })
        }

        if (this.file.files[0]) {
            reader.readAsDataURL(this.file.files[0])
        } else {
            this.setState({ preview: this.props.preview })
        }
    }

    private renderImage(data): React.ReactNode {
        const { input: { value: trueValue, ...iProps }, meta: trueMeta, ...props } = data

        const { label, type, required, preview } = this.props
        const { touched, error } = data.meta
        const blockClassName = ClassNames('form__block', `form__block--${type.name}`, { 'form__block--error': touched && !!error }, { 'form__block--empty': !trueValue }, { 'form__block--required': !!required })
        const inputProps = { ...iProps, autoComplete: 'off', className: 'form__field form__field--' + type.name }


        return (
            <label className={blockClassName} style={{ backgroundImage: preview ? `url(${this.state.preview})` : null }}>
                <input
                    {...inputProps}
                    {...props}
                    onChange={this.handleChangeImage}
                    type='file'
                    ref={ref => this.file = ref} />
                <p className='form__label'>
                    {touched && error ? error : label}
                </p>
            </label>
        )
    }

    /**
     * Render component.
     * @param data
     */
    private renderComponent = (data): React.ReactNode => {
        const { label, type, required } = this.props
        const { touched, error } = data.meta
        const blockClassName = ClassNames('form__block', `form__block--${type.name}`, { 'form__block--error': touched && !!error }, { 'form__block--empty': !data.input.value && data.input.value !== 0 }, { 'form__block--required': !!required })
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

        if (type === Field.IMAGE) {
            return this.renderImage(data)
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
        const { label, name, type, ...props } = this.props

        return (
            <ReduxField
                component={this.renderComponent}
                label={label}
                name={name}
                validate={this.validator}
                type={type}
                {...props} />
        )
    }

}

export default Field