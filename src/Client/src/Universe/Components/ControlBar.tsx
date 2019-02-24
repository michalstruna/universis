import * as React from 'react'

import { SimpleComponent } from '../../Utils'

/**
 * Component control bar.
 */
class ControlBar extends SimpleComponent {

    public render(): React.ReactNode {
        return (
            <section className='universe__control-bar'>
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
                    <section className='universe__time--inner' />
                </section>
                <section className='universe__view'>
                    <section className='universe__view--inner' />
                </section>
            </section>
        )
    }

}

export default ControlBar