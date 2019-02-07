import * as React from 'react'

import { StatelessComponent } from '../../Utils'

interface IProps {

}

class BodyTimeline extends StatelessComponent<IProps> {

    public render(): React.ReactNode {
        return (
            <section className='panel__body__discussion'>
                <section className='panel__body__discussion__topic'>
                    <section className='panel__body__discussion__avatar' />
                    <section className='panel__body__discussion__content'>
                        <section className='panel__body__discussion__metadata'>
                            <span className='panel__body__discussion__author'>
                                Michal
                            </span>
                            <span className='panel__body__discussion__date'>
                                1h
                            </span>
                        </section>
                        <section className='panel__body__discussion__content'>

                        </section>
                        <section className='panel__body__discussion__controls'>
                            <span className='panel__body__discussion__up'>
                                +1
                            </span>
                            <span className='panel__body__discussion__down'>
                                -1
                            </span>
                            <span className='panel__body__discussion__show'>
                                Zobrazit 7 odpovědí
                            </span>
                        </section>
                    </section>
                </section>
            </section>
        )
    }

}

export default BodyTimeline.connect()