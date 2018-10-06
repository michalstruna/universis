import * as React from 'react'

import { SimpleComponent } from '../../Utils'

/**
 * Component control bar.
 */
class ControlBar extends SimpleComponent {

    /**
     * Element for view size.
     */
    public static viewSize: HTMLElement

    public render(): JSX.Element {
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
                    <section className='universe__view--inner' ref={ref => ControlBar.viewSize = ref} />
                </section>
            </section>
        )
    }

}

export default ControlBar