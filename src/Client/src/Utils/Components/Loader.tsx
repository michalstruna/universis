import * as React from 'react'

import SimpleComponent from './SimpleComponent'

/**
 * Component for animated loader.
 */
class Loader extends SimpleComponent {

    public render(): React.ReactNode {
        return (
            <section className='loader'>
                <section className='loader--inner' />
            </section>
        )
    }

}

export default Loader