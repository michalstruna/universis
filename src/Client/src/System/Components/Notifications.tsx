import * as React from 'react'

import { StatelessComponent, UILayout, FadeLayout } from '../../Utils'
import { UserInfo } from '../../User'
import { ApprovalState, SubjectType } from '../../../../Constants'
import { Message } from '../../Panel'

interface IProps {
    notifications: Universis.Notification[]
}

/**
 * Render animated background.
 */
class Notifications extends StatelessComponent<IProps> {

    private getNotificationContent(notification: Universis.Notification): React.ReactNode {
        switch (notification.subjectType) {
            case SubjectType.POST:
                return (
                    <>
                        <strong><UserInfo
                            type={UserInfo.TYPES.NAME} /> okomentoval {notification.subjectName}:</strong> {notification.text}
                    </>
                )

            case SubjectType.MESSAGE:
                return (
                    <>
                        <strong><UserInfo
                            type={UserInfo.TYPES.NAME} /> napsal:</strong> {notification.text}
                    </>
                )

        }

        return null
    }

    private renderNotifications(): React.ReactNode {
        const { notifications } = this.props

        return notifications.map((notification, key) => {
            return (
                <FadeLayout
                    mounted={!notification.isExpired}
                    className={'notifications__notification' + (notification.subjectType === SubjectType.MESSAGE ? ' notifications__notification--small' : (notification.approvalState === ApprovalState.APPROVED ? '' : ' notifications__notification--large'))}
                    key={notification._id}
                    type={FadeLayout.HEIGHT}>
                    <Message data={notification} />
                </FadeLayout>
            )
        })
    }

    public render(): React.ReactNode {
        return (
            <UILayout className='notifications'>
                {this.renderNotifications()}
            </UILayout>
        )
    }

}

export default Notifications.connect(
    ({ system }: Universis.Redux.StoreState) => ({
        notifications: system.notifications
    })
)