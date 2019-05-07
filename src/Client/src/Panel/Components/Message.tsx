import * as React from 'react'
import { Link, RelativeTime, StatelessComponent } from '../../Utils'
import { ApprovalState, SubjectType } from '../../../../Constants'
import { UserInfo } from '../../User'

interface IProps {
    data: Universis.Notification
    isLast?: boolean
    identity: Universis.User.Identity
    notificationStrings: Universis.Strings
}

class Message extends StatelessComponent<IProps> {

    private renderMessageRelation(message: Universis.Notification): string {
        const { notificationStrings } = this.props
        const subject = notificationStrings[message.subjectType]

        if (subject) {
            return subject[message.approvalState][message.operation]
        }
    }

    private renderLink(message: Universis.Notification): React.ReactNode {
        if (message.approvalState !== ApprovalState.APPROVED || !message.link) {
            return null
        }

        if (message.link.startsWith('?')) {
            return (
                <Link className='panel__chat__message__link' query={message.link} />
            )
        }

        return (
            <Link className='panel__chat__message__link' target={message.link} />
        )
    }

    private renderApprovalState(message: Universis.Notification): React.ReactNode {
        const { notificationStrings } = this.props

        if (message.approvalState == ApprovalState.APPROVED) {
            return null
        }

        return (
            <section className={'panel__chat__message__state panel__chat__message__state--' + message.approvalState}>
                {message.approvalState === ApprovalState.UNAPPROVED ? notificationStrings.unapproved : notificationStrings.disapproved}
            </section>
        )
    }

    public render(): React.ReactNode {
        const { data: message, identity, isLast } = this.props

        switch (message.subjectType) {
            case SubjectType.MESSAGE:
                return (
                    <section
                        className={'panel__chat__message' + (message.user && identity && message.user._id === identity._id ? ' panel__chat__message--own' : '') + (isLast ? ' panel__chat__message--new' : '')}>
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
                            <p className='panel__chat__message__text'>
                                {message.text}
                            </p>
                        </section>
                    </section>
                )
            default:
                return (
                    <section
                        className={'panel__chat__message--outer' + (isLast ? ' panel__chat__message--new' : '')}>
                        <section className='panel__chat__message__title'>
                            <UserInfo type={UserInfo.TYPES.NAME}
                                      user={message.user} /> {this.renderMessageRelation(message)} {message.subjectName}.
                        </section>
                        {this.renderApprovalState(message)}
                        <section
                            className={'panel__chat__message' + (message.user && identity && message.user._id === identity._id ? ' panel__chat__message--own' : '')}>
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
                                <p className='panel__chat__message__text'>
                                    {message.text}
                                </p>
                            </section>
                        </section>
                        {this.renderLink(message)}
                    </section>
                )
        }
    }

}

export default Message.connect(
    ({ user, system }: Universis.Redux.StoreState) => ({
        identity: user.identity,
        notificationStrings: system.strings.notifications
    })
)