import * as React from 'react'

import { StatelessComponent } from '../../Utils'
import FieldInput, { ICustomFieldProps } from './Field'

/**
 * Component for rendering text input in form.
 */
class TextField extends StatelessComponent<ICustomFieldProps> {

    public render(): JSX.Element {
        return (
            <FieldInput { ...this.props} type='text' />
        )
    }

}

export default TextField