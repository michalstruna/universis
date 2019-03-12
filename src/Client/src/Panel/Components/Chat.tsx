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
            if (Math.random() < 0.3) {
                messages.push(
                    <section
                        className={'panel__chat__message panel__chat__message--event'}
                        key={i}>
                        <section className='panel__chat__message--inner'>
                            <section className='panel__chat__message__metadata'>
                        <span className='panel__chat__message__date'>
                            2 d
                        </span>
                            </section>
                            Michal okomentoval těleso Jupiter.
                        </section>
                    </section>
                )
            } else {
                messages.push(
                    <section
                        className={'panel__chat__message' + (Math.random() < 0.5 ? ' panel__chat__message--own' : '')}
                        key={i}>
                        <UserInfo type={UserInfo.TYPES.SMALL} />
                        <section className='panel__chat__message--inner'>
                            <section className='panel__chat__message__metadata'>
                            <span className='panel__chat__message__author'>
                            Michal
                        </span>
                                <span className='panel__chat__message__date'>
                            2 d
                        </span>
                            </section>
                            Ahoj! Toto je druhá zpráva. Ahoj! Toto je druhá zpráva. Ahoj! Toto
                            je druhá
                            zpráva.
                        </section>
                    </section>
                )
            }
        }

        return messages
    }

    public render(): React.ReactNode {
        return (
            <section className='panel__chat'>
                <section className='panel__window__body'>
                    <section className='panel__window__body--scroll'>
                        <section className='panel__window__body--inner'>
                            {this.renderMessages()}
                        </section>
                    </section>
                    <section className='panel__chat__new-message'>
                        <input className='panel__chat__input' type='text' placeholder='Vaše zpráva, @uživatel...' />
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