import * as React from 'react'

import FieldInput, { IFieldInputProps } from './FieldInput'
import { StatelessComponent } from '../../Utils'

/**
 * Component for rendering email input in form.
 */
class InputInput extends StatelessComponent<IFieldInputProps> {

    public render(): JSX.Element {

        return (
            <FieldInput { ...this.props} type='email' />
        )
    }

}

export default InputInput