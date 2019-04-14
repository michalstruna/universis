import * as React from 'react'

import { StatelessComponent, UILayout, FadeLayout } from '../../Utils'
import { UserInfo } from '../../User'

interface IProps {
    notifications: Universis.Notification[]
}

/**
 * Render animated background.
 */
class Notifications extends StatelessComponent<IProps> {

    private renderNotifications(): React.ReactNode {
        const { notifications } = this.props

        return notifications.map((notification, key) => {
            return (
                <FadeLayout
                    mounted={!notification.isExpired}
                    className='notifications__notification'
                    key={key}
                    type={FadeLayout.HEIGHT}>
                    <strong><UserInfo type={UserInfo.TYPES.NAME} /> napsal zprávu:</strong> {notification.name}
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