import * as React from 'react'

import Unit from '../Constants/SizeUnit'
import Units from '../Utils/Units'
import { StatelessComponent, Numbers } from '../../Utils'

interface IProps {
    children: number,
    short?: boolean,
    input?: number,
    row?: any
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

    private static NAMES = {
        M: 'm',
        KM: 'km',
        AU: 'AU',
        LY: 'ly',
        KLY: 'kly',
        MLY: 'Mly',
        GLY: 'Gly',
        TLY: 'Tly'
    }

    private getUnit(): string {
        const { children, input, short } = this.props

        let value = Units.convert(input, Unit.M, children)

        let unit

        for (const i in Unit) {
            const unitNamesKeys = Object.keys(SizeUnit.NAMES)
            const nextUnitKey = unitNamesKeys[unitNamesKeys.indexOf(i) + 1]
            const nextUnitName = SizeUnit.NAMES[(nextUnitKey || '')]

            if (!nextUnitName || value < Unit[nextUnitKey]) {
                unit = SizeUnit.NAMES[i]
                value /= Unit[i]
                break
            }
        }

        const format = short ? Numbers.toShort : Numbers.toReadable
        return format(value) + ' ' + unit
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