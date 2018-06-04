import * as React from 'react'

import { StatelessComponent } from '../../Utils'
import FieldInput, { IFieldInputProps } from './FieldInput'

/**
 * Component for rendering text input in form.
 */
class TextInput extends StatelessComponent<IFieldInputProps> {

    public render(): JSX.Element {
        return (
            <FieldInput { ...this.props} type='text' />
        )
    }

}

export default TextInput