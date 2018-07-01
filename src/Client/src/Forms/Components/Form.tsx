import * as ClassNames from 'classnames'
import * as React from 'react'

import { Component, SquareLoader } from '../../Utils'
import FormActions from '../Redux/FormActions'

interface IFormProps {
    form: any
    children: JSX.Element[]
    name: string
    onSubmit: ITripleConsumer<any, IRunnable, IConsumer<string>>
    send: IConsumer<string>
    fail: IDoubleConsumer<string, string>
    success: IConsumer<string>
    setInput: IQuadraConsumer<string, string, any, boolean>
    timeoutError: string
}

export interface IFormState {
    values: { [name: string]: { value: string, isValid: boolean } }
}

/**
 * Component for rendering forms.
 */
class Form extends Component<IFormProps, IFormState> {

    /**
     * Callback after submit form.
     * @param event
     */
    private handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        const { onSubmit, form, name, send } = this.props
        event.preventDefault()
        send(name)

        const values = {}

        for (const field in form[name]) {
            if (field !== 'send' && field !== 'error') { // TODO: Constants?
                values[field] = form[name][field].value
            }
        }

        onSubmit(values, this.handleSuccess, this.handleFail)
    }

    /**
     * After change value of some input, update state of form.
     * @param name Name of input.
     * @param value Value of input.
     * @param isValid Value is valid.
     */
    private handleChange = (name: string, value: string, isValid: boolean): void => {
        const { setInput, name: formName } = this.props
        setInput(formName, name, value, isValid)
    }

    /**
     * Check if all inputs in form are valid.
     * @returns Form is valid.
     */
    private isValid(): boolean {
        const { form, name } = this.props

        let isValid = true

        React.Children.map(this.props.children, (child: React.ReactElement<any>) => {
            if (form[name] && form[name][child.props.name] && !form[name][child.props.name].isValid) {
                isValid = false
            }
        })

        return isValid
    }

    /**
     * Handle success.
     */
    private handleSuccess = (): void => {
        const { name, success } = this.props
        success(name)
    }

    /**
     * Handle fail.
     * @param error Error message.
     */
    private handleFail = (error: string): void => {
        const { fail, name } = this.props
        fail(name, error)
    }

    /**
     * Render all children.
     * Bind ref, onChange and value to all input children.
     * @return All children.
     */
    private renderChildren(): JSX.Element[] {
        const { form, children, name: formName } = this.props
        return React.Children.map(children, (child: React.ReactElement<any>) => {
            const { name } = child.props

            if (name) {
                const newProps = {
                    ref: name,
                    onChange: (value: string, isValid: boolean) => this.handleChange(name, value, isValid),
                    value: ''
                }

                if (form && form[formName] && form[formName][name].value) {
                    newProps.value = form[formName][name].value
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
            { 'form--send': form[name] && form[name].send },
            { 'form--invalid': !this.isValid() }
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
    ({ form }: any) => ({
        form
    }),
    (dispatch: any) => ({
        send: (form: string) => dispatch(FormActions.send(form)),
        success: (form: string) => dispatch(FormActions.success(form)),
        fail: (form: string, error: string) => dispatch(FormActions.fail(form, error)),
        setInput: (form: string, input: string, value: any, isValid: boolean) => dispatch(FormActions.setInput(form, input, value, isValid))
    })
)