import * as React from 'react'

import { SimpleComponent } from '../../Utils'

/**
 * Components for chat.
 */
class Chat extends SimpleComponent {

    public render(): JSX.Element {
        return (
            <section className='panel__chat'>
                <section className='panel__chat__body'>
                    <section className='panel__chat__body--scroll'
                             onWheel={event => event.stopPropagation()}>
                        <section className='panel__chat__body--inner'>
                            <section className='panel__chat__message'>
                                <section className='panel__chat__avatar' />
                                <section className='panel__chat__message--inner'>
                                    Ahoj! Toto je první zpráva.
                                </section>
                            </section>
                            <section className='panel__chat__message'>
                                <section className='panel__chat__avatar' />
                                <section className='panel__chat__message--inner'>
                                    Ahoj! Toto je druhá zpráva. Ahoj! Toto je druhá zpráva. Ahoj! Toto
                                    je druhá
                                    zpráva. Ahoj! Toto je druhá zpráva. Ahoj! Toto je druhá zpráva.
                                </section>
                            </section>
                            <section className='panel__chat__message'>
                                <section className='panel__chat__avatar' />
                                <section className='panel__chat__message--inner'>
                                    Ahoj! Toto je druhá zpráva. Ahoj! Toto je druhá zpráva. Ahoj! Toto
                                    je druhá
                                    zpráva. Ahoj! Toto je druhá zpráva. Ahoj! Toto je druhá zpráva.
                                </section>
                            </section>
                            <section className='panel__chat__message'>
                                <section className='panel__chat__avatar' />
                                <section className='panel__chat__message--inner'>
                                    Ahoj! Toto je druhá zpráva. Ahoj! Toto je druhá zpráva. Ahoj! Toto
                                    je druhá
                                    zpráva. Ahoj! Toto je druhá zpráva. Ahoj! Toto je druhá zpráva.
                                </section>
                            </section>
                            <section className='panel__chat__message'>
                                <section className='panel__chat__avatar' />
                                <section className='panel__chat__message--inner'>
                                    Ahoj! Toto je druhá zpráva. Ahoj! Toto je druhá zpráva. Ahoj! Toto
                                    je druhá
                                    zpráva. Ahoj! Toto je druhá zpráva. Ahoj! Toto je druhá zpráva.
                                </section>
                            </section>
                            <section className='panel__chat__message'>
                                <section className='panel__chat__avatar' />
                                <section className='panel__chat__message--inner'>
                                    Ahoj! Toto je druhá zpráva. Ahoj! Toto je druhá zpráva. Ahoj! Toto
                                    je druhá
                                    zpráva. Ahoj! Toto je druhá zpráva. Ahoj! Toto je druhá zpráva.
                                </section>
                            </section>
                            <section className='panel__chat__message'>
                                <section className='panel__chat__avatar' />
                                <section className='panel__chat__message--inner'>
                                    Ahoj! Toto je druhá zpráva. Ahoj! Toto je druhá zpráva. Ahoj! Toto
                                    je druhá
                                    zpráva. Ahoj! Toto je druhá zpráva. Ahoj! Toto je druhá zpráva.
                                </section>
                            </section>
                            <section className='panel__chat__message'>
                                <section className='panel__chat__avatar' />
                                <section className='panel__chat__message--inner'>
                                    Ahoj! Toto je druhá zpráva. Ahoj! Toto je druhá zpráva. Ahoj! Toto
                                    je druhá
                                    zpráva. Ahoj! Toto je druhá zpráva. Ahoj! Toto je druhá zpráva.
                                </section>
                            </section>
                            <section className='panel__chat__message'>
                                <section className='panel__chat__avatar' />
                                <section className='panel__chat__message--inner'>
                                    Ahoj! Toto je druhá zpráva. Ahoj! Toto je druhá zpráva. Ahoj! Toto
                                    je druhá
                                    zpráva. Ahoj! Toto je druhá zpráva. Ahoj! Toto je druhá zpráva.
                                </section>
                            </section>
                            <section className='panel__chat__message'>
                                <section className='panel__chat__avatar' />
                                <section className='panel__chat__message--inner'>
                                    Ahoj! Toto je druhá zpráva. Ahoj! Toto je druhá zpráva. Ahoj! Toto
                                    je druhá
                                    zpráva. Ahoj! Toto je druhá zpráva. Ahoj! Toto je druhá zpráva.
                                </section>
                            </section>
                            <section className='panel__chat__message'>
                                <section className='panel__chat__avatar' />
                                <section className='panel__chat__message--inner'>
                                    Ahoj!
                                </section>
                            </section>
                            <section className='panel__chat__message'>
                                <section className='panel__chat__avatar' />
                                <section className='panel__chat__message--inner'>
                                    Ahoj! Toto je druhá zpráva. Ahoj! Toto je druhá zpráva. Ahoj! Toto
                                    je druhá
                                    zpráva. Ahoj! Toto je druhá zpráva. Ahoj! Toto je druhá zpráva.
                                </section>
                            </section>
                            <section className='panel__chat__message panel__chat__message--own'>
                                <section className='panel__chat__avatar' />
                                <section className='panel__chat__message--inner'>
                                    Ahoj! Toto je druhá zpráva. Ahoj! Toto je druhá zpráva. Ahoj! Toto
                                    je druhá
                                    zpráva.
                                </section>
                            </section>
                            <section className='panel__chat__message'>
                                <section className='panel__chat__avatar' />
                                <section className='panel__chat__message--inner'>
                                    Ahoj! Toto je zpráva.
                                </section>
                            </section>
                        </section>
                    </section>
                    <section className='panel__chat__new-message'>
                        <input className='panel__chat__input' type='text' placeholder='Vaše zpráva...' />
                        <button className='panel__chat__send' />
                    </section>
                </section>
                <section className='panel__chat__menu'>
                    <button className='panel__chat__menu__button'>
                        Veřejný
                    </button>
                    <button className='panel__chat__menu__button'>
                        cygne14
                    </button>
                    <button className='panel__chat__menu__button'>
                        matejmik
                    </button>
                </section>
            </section>
        )
    }

}

export default Chat.connect()