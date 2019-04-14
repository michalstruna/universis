import * as React from 'react'
import { InjectedFormProps } from 'redux-form'

import { getMessages, UserInfo, addMessage, toggleStickyChat } from '../../User'
import { AsyncEntity, FadeLayout, RelativeTime, StatelessComponent } from '../../Utils'
import Config from '../Constants/Config'
import { Form, Field } from '../../Forms'

interface IProps {
    messages: Universis.Redux.AsyncEntity<Universis.Notification[]>
    getMessages: Universis.Consumer<number>
    identity: Universis.User.Identity
    addMessage: Universis.Consumer<Universis.Message.New>
    newMessage: Universis.Redux.AsyncEntity<Universis.Message.New>
    isSticky: boolean
    toggleStickyChat: Universis.Consumer<boolean>
    unreadMessages: boolean
}

interface IValues {
    content: string
}

/**
 * Components for chat.
 */
class Chat extends StatelessComponent<IProps & InjectedFormProps<IValues>> {

    public static FORM_NAME = 'chat'

    private chat: HTMLElement

    public componentDidMount(): void {
        const { getMessages, messages } = this.props
        AsyncEntity.request(messages, () => getMessages(Config.OVERVIEW_SIZE))
        this.scrollDown()
    }

    public componentDidUpdate(prevProps: IProps): void {
        const { messages, isSticky } = this.props

        if (isSticky) {
            if (messages.payload && (!prevProps.messages.payload || messages.payload.length !== prevProps.messages.payload.length)) {
                this.scrollDown()
            }
        }
    }

    private scrollDown(): void {
        let i = 0

        const scroll = setInterval(() => {
            this.chat.scrollTop = this.chat.scrollHeight

            if (i++ > 30) {
                clearInterval(scroll)
            }
        }, 10)
    }

    /**
     * Render messages.
     * @returns Messages.
     */
    private renderMessages(): React.ReactNode[] {
        const { messages, identity } = this.props

        return messages.payload.map((message, key) => {
            return (
                <section
                    className={'panel__chat__message' + (message.user && identity && message.user._id === identity._id ? ' panel__chat__message--own' : '') + (key === messages.payload.length - 1 ? ' panel__chat__message--new' : '')}
                    key={key}>
                    <UserInfo user={message.user} type={UserInfo.TYPES.SMALL} />
                    <section className='panel__chat__message--inner'>
                        <section className='panel__chat__message__metadata'>
                            <span className='panel__chat__message__author'>
                                {message.user ? message.user.name : 'Nepřihlášený'}
                        </span>
                            <span className='panel__chat__message__date'>
                                 <RelativeTime date={message.createdAt} />
                        </span>
                        </section>
                        {message.text}
                    </section>
                </section>
            )
        })
        /*
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
                                    Ahoj! Toto je druhá zpráva.
                                    je druhá
                                    zpráva.
                                </section>
                            </section>
                        )
                    }
                }

                return messages*/
    }

    /**
     * Add message..
     * @param data
     */
    private handleSubmit = async (data: IValues) => {
        const { reset, addMessage } = this.props

        try {
            await addMessage(data)
            reset()
        } catch {

        }
    }

    private handleScroll = () => {
        const { isSticky, toggleStickyChat } = this.props
        const isBottom = this.chat.scrollTop === this.chat.scrollHeight - this.chat.offsetHeight

        if (isBottom !== isSticky) {
            toggleStickyChat(isBottom)
        }
    }

    private renderUnread() {
        const { unreadMessages } = this.props

        return (
            <FadeLayout
                mounted={unreadMessages && this.chat && this.chat.offsetHeight !== this.chat.scrollHeight}
                onClick={() => document.querySelector('.panel__chat__message:last-of-type').scrollIntoView({ behavior: 'smooth' })}
                className='panel__chat__unread'>
                &#x25BC; Nepřečtené zprávy ({unreadMessages})
            </FadeLayout>
        )
    }

    public render(): React.ReactNode {
        const { messages, handleSubmit, invalid, submitting } = this.props

        return (
            <section className='panel__chat'>
                {this.renderUnread()}
                <section
                    className='panel__window__body--scroll'
                    ref={ref => this.chat = ref}
                    onScroll={this.handleScroll}>
                    <section className='panel__window__body--inner'>
                        <AsyncEntity
                            data={messages}
                            success={() => this.renderMessages()} />
                    </section>
                </section>
                <Form
                    onSubmit={handleSubmit(this.handleSubmit)}
                    invalid={invalid}
                    sending={submitting}>
                    <Field
                        name='content'
                        label='Vaše zpráva, @uživatel...'
                        required='Vaše zpráva, @uživatel...' />
                    <Form.Submit />
                </Form>
            </section>
        )
    }

}

export default Chat.connect(
    ({ user }: Universis.Redux.StoreState) => ({
        identity: user.identity,
        messages: user.messages,
        newMessage: user.newMessage,
        isSticky: user.isChatSticky,
        unreadMessages: user.unreadMessages
    }),
    { getMessages, addMessage, toggleStickyChat },
    {
        form: Chat.FORM_NAME
    }
)