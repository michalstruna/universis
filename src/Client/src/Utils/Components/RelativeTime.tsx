import * as React from 'react'

import { StatelessComponent, Units } from '../../Utils'

interface IProps {
    date: string
}

// TODO: Real time update.

class RelativeTime extends StatelessComponent<IProps> {

    public render(): React.ReactNode {
        const { date } = this.props
        const diff = Math.abs(new Date().getTime() - new Date(date).getTime()) / 1000

        if (diff < Units.convert(Units.TIME.M, Units.TIME.S)) {
            return 'teď'
        } else {
            return Units.toFull(diff, Units.TIME.S, Units.TIME).replace(/,[0-9]+/, '')
        }
    }

}

export default RelativeTime