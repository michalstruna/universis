import * as React from 'react'

import { StatelessComponent } from '../../Utils'
import FieldInput, { IFieldInputProps } from './Field'
import Strings from '../../../../Utils/Strings'

/**
 * Component for rendering password input in form.
 */
class PasswordField extends StatelessComponent<IFieldInputProps> {

    public static defaultProps = {
        pattern: Strings.PASSWORD_PATTERN
    }

    public render(): JSX.Element {
        return (
            <FieldInput
                { ...this.props}
                type='password'
                pattern={this.props.pattern} />
        )
    }

}

export default PasswordField