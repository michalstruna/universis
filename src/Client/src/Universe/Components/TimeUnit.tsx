import * as React from 'react'

import Unit from '../Constants/TimeUnit'
import Units from '../Utils/Units'
import { StatelessComponent, Numbers } from '../../Utils'

interface IProps {
    children: number,
    short?: boolean,
    input?: number
}

/**
 * Component for converting size units to readable form.
 */
class SizeUnit extends StatelessComponent<IProps> {

    /**
     * List of all size units.
     */
    static UNITS = Unit

    static defaultProps = {
        input: Unit.S
    }

    /**
     * Format number to unit (3 600 to 1 h).
     * @returns Value with unit.
     */
    private getUnit(): string {
        const { children, input, short } = this.props
        let newValue = Math.floor(Units.convert(children, input, Unit.S))
        let unit

        if (newValue < 2 * Unit.M) {
            unit = 's'
        } else if (newValue < 2 * Unit.H) {
            unit = 'm'
            newValue /= Unit.M
        } else if (newValue < 2 * Unit.D) {
            unit = 'h'
            newValue /= Unit.H
        } else if (newValue < 2 * Unit.Y) {
            unit = 'd'
            newValue /= Unit.D
        } else {
            unit = 'r'
            newValue /= Unit.Y
        }

        newValue = Math.round(newValue)

        if (short) {
            return Numbers.toShort(newValue) + ' ' + unit
        } else {
            return Numbers.toReadable(newValue) + ' ' + unit
        }


    }

    public render(): JSX.Element {
        return (
            <React.Fragment>
                {this.getUnit()}
            </React.Fragment>
        )
    }

}

export default SizeUnit