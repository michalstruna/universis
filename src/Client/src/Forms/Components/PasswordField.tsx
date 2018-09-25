import * as React from 'react'

import { StatelessComponent } from '../../Utils'
import Field, { ICustomFieldProps } from './Field'
import Strings from '../../../../Utils/Strings'

/**
 * Component for rendering password input in form.
 */
class PasswordField extends StatelessComponent<ICustomFieldProps> {

    public static defaultProps = {
        pattern: Strings.PASSWORD_PATTERN
    }

    private validate = value => {
        const { validate, required, invalid } = this.props

        if (validate) {
            return validate(value)
        } else if (required && !value) {
            return required
        } else if (!Strings.isPassword(value)) {
            return invalid
        }
    }

    public render(): JSX.Element {
        const { name, label } = this.props

        return (
            <Field
                name={name}
                label={label}
                type='password'
                validate={this.validate} />
        )
    }

}

export default PasswordField