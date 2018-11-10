import * as React from 'react'

import Units from '../Utils/Units'
import { StatelessComponent } from '../../Utils'

interface IProps {
    children: number
}

/**
 * Component for converting size units to readable form.
 */
class SizeUnit extends StatelessComponent<IProps> {

    public render(): JSX.Element {
        const { children } = this.props

        if (typeof children !== 'number') {
            return null
        }

        return (
            <React.Fragment>
                {Units.formatTemperature(children)}
            </React.Fragment>
        )
    }

}

export default SizeUnit