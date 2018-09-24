import * as React from 'react'

import Field, { ICustomFieldProps } from './Field'
import Strings from '../../../../Utils/Strings'
import { StatelessComponent } from '../../Utils'

/**
 * Component for rendering email input in form.
 */
class EmailField extends StatelessComponent<ICustomFieldProps> {

    private validate = value => {
        const { validate, required, invalid } = this.props

        if (validate) {
            return validate(value)
        } else if (required && !value) {
            return required
        } else if (!Strings.isEmail(value)) {
            return invalid
        }
    }

    public render(): JSX.Element {
        const { name, label } = this.props

        return (
            <Field
                name={name}
                label={label}
                type='email'
                validate={this.validate} />
        )
    }

}

export default EmailField