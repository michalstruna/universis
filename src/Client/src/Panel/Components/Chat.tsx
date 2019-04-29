import * as React from 'react'
import { InjectedFormProps } from 'redux-form'

import { getMessages, addMessage, toggleStickyChat } from '../../User'
import { AsyncEntity, FadeLayout, StatelessComponent } from '../../Utils'
import Config from '../Constants/Config'
import { Form, Field } from '../../Forms'
import Message from './Message'

interface IProps {
    messages: Universis.Redux.AsyncEntity<Universis.Notification[]>
    getMessages: Universis.Consumer<number>
    identity: Universis.User.Identity
    addMessage: Universis.Consumer<Universis.Message.New>
    newMessage: Universis.Redux.AsyncEntity<Universis.Message.New>
    isSticky: boolean
    toggleStickyChat: Universis.Consumer<boolean>
    unreadMessages: boolean
    notificationStrings: Universis.Strings
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
            if (this.chat) {
                this.chat.scrollTop = this.chat.scrollHeight
            }

            if (i++ > 30) {
                clearInterval(scroll)
            }
        }, 10)
    }

    /**
     * Render messages.
     * @returns Messages.
     */
    private renderMessages(): React.ReactNode {
        const { messages } = this.props

        return messages.payload.map((message, key) => (
            <Message data={message} isLast={messages.payload.length - 1 === key} key={key} />
        ))
    }

    /**
     * Add message.
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
        const { unreadMessages, isSticky } = this.props

        return (
            <FadeLayout
                mounted={unreadMessages && this.chat && this.chat.offsetHeight !== this.chat.scrollHeight && !isSticky}
                onClick={() => document.querySelector('.panel__window__body--inner > section:last-of-type').scrollIntoView({ behavior: 'smooth' })}
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
    ({ user, system }: Universis.Redux.StoreState) => ({
        identity: user.identity,
        messages: user.messages,
        newMessage: user.newMessage,
        isSticky: user.isChatSticky,
        unreadMessages: user.unreadMessages,
        notificationStrings: system.strings.notifications
    }),
    { getMessages, addMessage, toggleStickyChat },
    {
        form: Chat.FORM_NAME
    }
)