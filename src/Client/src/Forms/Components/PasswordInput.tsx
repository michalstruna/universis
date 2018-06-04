import * as React from 'react'

import { StatelessComponent } from '../../Utils'
import FieldInput, { IFieldInputProps } from './FieldInput'

/**
 * Component for rendering password input in form.
 */
class PasswordInput extends StatelessComponent<IFieldInputProps> {

    public render(): JSX.Element {
        return (
            <FieldInput { ...this.props} type='password' />
        )
    }

}

export default PasswordInput