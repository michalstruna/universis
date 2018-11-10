import * as React from 'react'

import Unit from '../Constants/SizeUnit'
import Units from '../Utils/Units'
import { StatelessComponent } from '../../Utils'

interface IProps {
    children: number
}

/**
 * Component for converting size units to readable form.
 */
class MassUnit extends StatelessComponent<IProps> {

    public static UNITS = Unit

    private getUnit(): string {
        const { children } = this.props

        if (typeof children !== 'number') {
            return null
        }

        return Units.formatMass(children)
    }

    public render(): JSX.Element {
        return (
            <React.Fragment>
                {this.getUnit()}
            </React.Fragment>
        )
    }

}

export default MassUnit