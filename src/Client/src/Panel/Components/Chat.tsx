import * as React from 'react'

import { UserInfo } from '../../User'
import { ContextInfo } from '../../Controls'
import { SimpleComponent } from '../../Utils'

/**
 * Components for chat.
 */
class Chat extends SimpleComponent {

    /**
     * Render messages.
     * @returns Messages.
     */
    private renderMessages(): React.ReactNode[] {
        const messages = []

        for (let i = 0; i < 50; i++) {
            messages.push(
                <section
                    className={'panel__chat__message' + (Math.random() < 0.5 ? ' panel__chat__message--own' : '')}
                    key={i}>
                    <ContextInfo
                        className='panel__chat__avatar'
                        content={<UserInfo type={UserInfo.TYPES.LARGE} />}>
                        <UserInfo type={UserInfo.TYPES.SMALL} />
                    </ContextInfo>
                    <section className='panel__chat__message--inner'>
                        Ahoj! Toto je druhá zpráva. Ahoj! Toto je druhá zpráva. Ahoj! Toto
                        je druhá
                        zpráva. Ahoj! Toto je druhá zpráva. Ahoj! Toto je druhá zpráva.
                    </section>
                </section>
            )
        }

        return messages
    }

    public render(): React.ReactNode {
        return (
            <section className='panel__chat panel__window'>
                <section className='panel__window__body'>
                    <section className='panel__window__body--scroll'>
                        <section className='panel__window__body--inner'>
                            <section className='panel__chat__start'>
                                Toto je počátek konverzace.
                            </section>
                            {this.renderMessages()}
                        </section>
                    </section>
                    <section className='panel__chat__new-message'>
                        <input className='panel__chat__input' type='text' placeholder='Vaše zpráva...' />
                        <button className='panel__chat__send' />
                    </section>
                </section>
                <section className='panel__window__menu'>
                    <button className='panel__window__menu__button'>
                        Veřejný
                    </button>
                    <button className='panel__window__menu__button'>
                        user1
                    </button>
                    <button className='panel__window__menu__button'>
                        user2
                    </button>
                </section>
            </section>
        )
    }

}

export default Chat.connect()