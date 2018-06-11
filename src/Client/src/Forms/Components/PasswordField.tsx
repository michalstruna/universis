import * as React from 'react'

import { StatelessComponent } from '../../Utils'
import FieldInput, { IFieldInputProps } from './Field'
import Strings from '../../../../Utils/Strings'

/**
 * Component for rendering password input in form.
 */
class PasswordField extends StatelessComponent<IFieldInputProps> {

    public render(): JSX.Element {
        return (
            <FieldInput
                { ...this.props}
                type='password'
                pattern={Strings.PASSWORD_PATTERN} />
        )
    }

}

export default PasswordField