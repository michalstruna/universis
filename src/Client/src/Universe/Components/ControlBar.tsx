import * as React from 'react'

import Units from '../Utils/Units'
import { StatelessComponent } from '../../Utils'

interface IProps {
    viewSize: number
}

/**
 * Component control bar.
 */
class ControlBar extends StatelessComponent<IProps> {

    public render(): JSX.Element {
        const { viewSize } = this.props

        return (
            <section className='universe__control-bar'>
                <button className='universe__toggle-panel' />
                <section className='universe__speed'>
                    <section className='universe__speed__item' />
                    <section className='universe__speed__item' />
                    <section className='universe__speed__item' />
                    <section className='universe__speed__item' />
                    <section className='universe__speed__item' />
                    <section className='universe__speed__item' />
                    <section className='universe__speed__item' />
                    <section className='universe__speed__item' />
                    <section className='universe__speed__item' />
                    <section className='universe__speed__item' />
                </section>
                <section className='universe__time'>
                    <section className='universe__time--inner'>
                        23.08.2018 20:47
                    </section>
                </section>
                <section className='universe__view'>
                    <section className='universe__view--inner'>
                        {Units.format(viewSize)}
                    </section>
                </section>
            </section>
        )
    }

}

export default ControlBar.connect(
    ({ universe }: IStoreState) => ({
        viewSize: universe.viewSize
    }),
    (dispatch: IDispatch) => ({})
)