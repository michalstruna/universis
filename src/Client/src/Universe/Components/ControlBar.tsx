import * as ClassNames from 'classnames'
import * as React from 'react'

import { StatelessComponent } from '../../Utils'

interface IProps {
    timeSpeed: number
}

/**
 * Component control bar.
 */
class ControlBar extends StatelessComponent<IProps> {

    /**
     * Render speed arrows.
     * @returns arrows.
     */
    private renderArrows(): React.ReactNode {
        const { timeSpeed } = this.props

        let count = Math.abs(timeSpeed)
        if (count > 1) {
            count = Math.log10(count) + 1
        }

        const arrows = []
        const className = ClassNames('universe__speed__item', { 'universe__speed__item--positive': timeSpeed > 0 }, { 'universe__speed__item--negative': timeSpeed < 0 }, { 'universe__speed__item--stop': timeSpeed < 0 })

        for (let i = 0; i < count; i++) {
            arrows.push(<section className={className} key={i} />)
        }

        return arrows
    }

    public render(): React.ReactNode {
        return (
            <section className='universe__control-bar'>
                <section className='universe__speed'>
                    {this.renderArrows()}
                </section>
                <section className='universe__time'>
                    <section className='universe__time--inner' />
                </section>
                <section className='universe__view'>
                    <section className='universe__view--inner' />
                </section>
            </section>
        )
    }

}

export default ControlBar.connect(
    ({ universe }: Universis.Redux.StoreState) => ({
        timeSpeed: universe.timeSpeed
    })
)