import * as React from 'react'

import Unit from '../Constants/SizeUnit'
import Units from '../Utils/Units'
import { StatelessComponent } from '../../Utils'

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

    public static UNITS = Unit

    static defaultProps = {
        input: Unit.KM
    }

    private getUnit(): string {
        const { children, input, short } = this.props
        return Units.formatSize(children, input, short)
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