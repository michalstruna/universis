import * as React from 'react'

import { UserInfo } from '../../User'
import { SimpleComponent } from '../../Utils'
import QueryMenu from '../../Utils/Components/QueryMenu'
import Queries from '../../Utils/Constants/Queries'

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
                    <UserInfo type={UserInfo.TYPES.SMALL} />
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
                <QueryMenu
                    query={Queries.CHAT_TAB}
                    links={{
                        'Veřejný chat': null
                    }}
                    className='panel__window__menu' />
            </section>
        )
    }

}

export default Chat.connect()