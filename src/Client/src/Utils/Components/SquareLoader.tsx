import * as React from 'react'

import SimpleComponent from './SimpleComponent'

/**
 * Component for animated square loader.
 */
class SquareLoader extends SimpleComponent {

    public render(): JSX.Element {
        return (
            <section className='square-loader'>
                <section className='square-loader--inner'>
                    <section className='square-loader--primary'>
                        <section className='square-loader--secondary' />
                    </section>
                    <section className='square-loader__shadow' />
                </section>
                <section className='square-loader__reflect' />
            </section>
        )
    }

}

export default SquareLoader