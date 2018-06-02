import * as React from 'react'

import { Component } from '../../Utils'

interface IProps {

}

interface IState {

}

/**
 * Render animated background.
 */
class AnimatedBackground extends Component<IProps, IState> {

    public render(): JSX.Element {
        return (
            <section className='animated-background'>
                <section className='animated-background--0' />
                <section className='animated-background--1' />
                <section className='animated-background--2' />
            </section>
        )
    }

}

export default AnimatedBackground