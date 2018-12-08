import * as React from 'react'

import { StatelessComponent } from '../../Utils'

interface IProps {

}

/**
 * Panel tab for body detail.
 */
class Body extends StatelessComponent<IProps> {

    public render(): React.ReactNode {
        return (
            <section className='panel__body panel__window'>
                <section className='panel__window__body'>
                    <section className='panel__window__body--scroll'>

                    </section>
                </section>
                <section className='panel__window__menu'>
                    <button className='panel__window__menu__button'>
                        Data
                    </button>
                    <button className='panel__window__menu__button'>
                        Časová osa
                    </button>
                    <button className='panel__window__menu__button'>
                        Diskuse
                    </button>
                </section>
            </section>
        )
    }

}

export default Body.connect()