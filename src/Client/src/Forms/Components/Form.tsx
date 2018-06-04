import * as ClassNames from 'classnames'
import * as React from 'react'

import { Component, SquareLoader } from '../../Utils'
import FormActions from '../Redux/FormActions'

export interface IFormProps {
    form: any,
    children: JSX.Element[],
    name: string
    onSubmit: (values: any, success: () => void, fail: (error: string) => void) => void,
    send: (form: string) => void,
    fail: (form: string, error: string) => void,
    success: (form: string) => void,
    setInput: (form: string, input: string, value: any) => void,
    timeoutError: string
}

export interface IFormState {
    values: { [name: string]: string }
}

/**
 * Component for rendering forms.
 */
class Form extends Component<IFormProps, IFormState> {

    /**
     * Time, after which will be attempt to send storned unsuccessful [ms].
     */
    public static SEND_EXPIRATION = 2000

    private timeout: number

    constructor(props: IFormProps) {
        super(props)
        this.initializeValues()
    }

    /**
     * Initialize state of values.
     */
    private initializeValues(): void {
        const { children, setInput, name } = this.props

        children.map(child => {
            if (child.props.name) {
                setInput(name, child.props.name, child.props.value)
            }
        })
    }

    /**
     * Callback after submit form.
     * @param event
     */
    private handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault()
        const { onSubmit, form, name, send, fail, timeoutError } = this.props
        send(name)
        onSubmit(form[name], this.handleSuccess, this.handleFail)

        this.timeout = window.setTimeout(() => {
            fail(name, timeoutError)
        }, Form.SEND_EXPIRATION)
    }

    /**
     * After change value of some input, update state of form.
     * @param name Name of input.
     * @param value Value of input.
     */
    private handleChange = (name: string, value: string): void => {
        this.props.setInput(this.props.name, name, value)
    }

    /**
     * Handle success.
     */
    private handleSuccess = (): void => {
        const { name, success } = this.props
        window.clearInterval(this.timeout)
        success(name)
    }

    /**
     * Handle fail.
     * @param error Error message.
     */
    private handleFail = (error: string): void => {
        window.clearInterval(this.timeout)
        this.props.fail(this.props.name, error)
    }

    /**
     * Render all children.
     * Bind ref, onChange and value to all input children.
     * @return All children.
     */
    private renderChildren(): JSX.Element[] {
        const { form, children, name: formName } = this.props

        if (!form || !form[formName]) {
            return null
        }

        return React.Children.map(children, (child: React.ReactElement<any>) => {
            const { name } = child.props
            const value = form[formName][name]

            if (name && value !== undefined) {
                const newProps = {
                    ref: name,
                    onChange: (value: string) => this.handleChange(name, value),
                    value
                }

                return React.cloneElement(child, newProps)
            } else {
                return child
            }
        })
    }

    public render(): JSX.Element {
        const { form, name } = this.props

        const className = ClassNames(
            'form',
            { 'form--send': form[name] && form[name].send }
        )

        return (
            <form
                className={className}
                onSubmit={this.handleSubmit}
                noValidate>
                {this.renderChildren()}
                <SquareLoader />
            </form>
        )
    }

}

export default Form.connect(
    ({ form, localization }: any) => ({
        form,
        timeoutError: '// TODO:'
    }),
    (dispatch: any) => ({
        send: (form: string) => dispatch(FormActions.send(form)),
        success: (form: string) => dispatch(FormActions.success(form)),
        fail: (form: string, error: string) => dispatch(FormActions.fail(form, error)),
        setInput: (form: string, input: string, value: any) => dispatch(FormActions.setInput(form, input, value))
    })
)