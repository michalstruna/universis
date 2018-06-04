import * as React from 'react'

import { StatelessComponent } from '../../Utils'
import FieldInput, { IFieldInputProps } from './Field'

/**
 * Component for rendering text input in form.
 */
class TextField extends StatelessComponent<IFieldInputProps> {

    public render(): JSX.Element {
        return (
            <FieldInput { ...this.props} type='text' />
        )
    }

}

export default TextField