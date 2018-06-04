import * as React from 'react'

import FieldInput, { IFieldInputProps } from './Field'
import Strings from '../../../../Utils/Strings'
import { StatelessComponent } from '../../Utils'

/**
 * Component for rendering email input in form.
 */
class EmailInput extends StatelessComponent<IFieldInputProps> {

    public render(): JSX.Element {
        return (
            <FieldInput
                { ...this.props}
                type='email'
                pattern={Strings.EMAIL_PATTERN}  />
        )
    }

}

export default EmailInput