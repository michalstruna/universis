import * as ClassNames from 'classnames'
import * as React from 'react'

import { StatelessComponent, Loader } from '../../Utils'

interface IFormData {
    [name: string]: any
}

interface IProps {
    onSubmit: IConsumer<IFormData>
    invalid: boolean
    sending: boolean
}

/**
 * Component for rendering form.
 */
class Form extends StatelessComponent<IProps> {

    public render(): React.ReactNode {
        const { children, onSubmit, invalid, sending } = this.props

        return (
            <form
                className={ClassNames('form', { 'form--invalid': invalid }, { 'form--sending': sending })}
                onSubmit={onSubmit}
                noValidate>
                {children}
                <Loader />
            </form>
        )
    }

}

export default Form