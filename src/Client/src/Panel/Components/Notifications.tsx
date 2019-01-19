import * as React from 'react'
import Masonry from 'react-masonry-component'

import { StatelessComponent, Link, AsyncEntity, RelativeTime, Words } from '../../Utils'
import { getNotifications } from '../Redux/PanelActions'

interface IProps {
    notifications: IAsyncEntity<Universis.Notification[]>
    getNotifications: IConsumer<number>
    strings: IStrings
}

const MASONRY_OPTIONS = {
    transitionDuration: 0
}

const NOTIFICATION_COUNT = 100

/**
 * Component for notifications.
 */
class Notifications extends StatelessComponent<IProps> {

    public componentWillMount(): void {
        const { notifications, getNotifications } = this.props
        AsyncEntity.request(notifications, () => getNotifications(NOTIFICATION_COUNT), true)
    }

    /**
     * Render notifications.
     * @returns Notification in masonry layout.
     */
    private renderNotifications(): React.ReactNode[] {
        const { notifications, strings } = this.props

        return notifications.payload.map((notification, key) => (
            <Link
                target={notification.target}
                className={'notifications__notification notifications__notification--' + notification.relation}
                key={key}>
                <section className='notifications__front'>
                    <section className='notifications__front--inner'>
                        {notification.text}
                    </section>
                </section>
                <section className='notifications__back'>
                    <section className='notifications__age'>
                        <RelativeTime date={notification.date} />
                    </section>
                    {Words.concatAdjectiveWithSubstantive(strings.relations[notification.relation], strings.subjects[notification.subject].toLowerCase())}
                </section>
            </Link>
        ))

    }

    public render(): React.ReactNode {
        const { notifications } = this.props

        return (
            <section className='notifications'>
                <AsyncEntity
                    data={notifications}
                    success={() => (
                        <Masonry
                            className={'notifications'}
                            elementType={'section'}
                            options={MASONRY_OPTIONS}>
                            {this.renderNotifications()}
                        </Masonry>
                    )} />
            </section>
        )
    }

}

export default Notifications.connect(
    ({ panel, system }: IStoreState) => ({
        notifications: panel.notifications,
        strings: system.strings.notifications
    }),
    { getNotifications }
)