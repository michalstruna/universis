import * as React from 'react'

import Unit from '../Constants/SizeUnit'
import Units from '../Utils/Units'
import { StatelessComponent, Numbers } from '../../Utils'

interface IProps {
    children: number,
    short?: boolean,
    input?: Unit
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
        input: Unit.KM
    }

    /**
     * Format number to unit (1 000 000 to 1 km).
     * @returns Value with unit.
     */
    private getUnit(): string {
        const { children, input, short } = this.props
        let newValue = Math.floor(Units.convert(children, input, Unit.KM) * Unit.KM)
        let unit

        if (newValue < 2 * Unit.KM) {
            unit = 'm'
        } else if (newValue < 2 * Unit.AU) {
            unit = 'km'
            newValue /= Unit.KM
        } else if (newValue < 2 * Unit.LY) {
            unit = 'AU'
            newValue /= Unit.AU
        } else if (newValue < 2 * Unit.KLY) {
            unit = 'ly'
            newValue /= Unit.LY
        } else if (newValue < 2 * Unit.MLY) {
            unit = 'Kly'
            newValue /= Unit.KLY
        } else if (newValue < 2 * Unit.GLY) {
            unit = 'Mly'
            newValue /= Unit.MLY
        } else if (newValue < 2 * Unit.TLY) {
            unit = 'Gly'
            newValue /= Unit.GLY
        } else {
            unit = 'Tly'
            newValue /= Unit.TLY
        }

        let milions = ''

        if (newValue > 1e7 && short) {
            newValue = Math.floor(Math.floor(newValue) / 1e5) / 10
            milions = 'M'
        }

        return Numbers.toReadable(newValue) + milions + ' ' + unit
    }

    public render(): JSX.Element {
        console.log(this.props.children)

        return (
            <React.Fragment>
                {this.getUnit()}
            </React.Fragment>
        )
    }

}

export default SizeUnit