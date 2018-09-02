import * as React from 'react'
import Masonry from 'react-masonry-component'

import { StatelessComponent, Link } from '../../Utils'

interface IProps {

}

const masonryOptions = {
    transitionDuration: 0
}

/**
 * Component for notifications.
 */
class Notifications extends StatelessComponent<IProps> {

    /**
     * Get suffix of class name of notification.
     * @param notification Notification.
     * @returns Suffix of class name.
     */
    private getClassNameSuffix(notification: any): string { // TODO: Type INotification.
        const random = Math.random()

        if (random < 0.5) {
            return 'high'
        } else {
            return 'normal'
        }
    }

    /**
     * Render notifications.
     * @returns Notification in masonry layout.
     */
    private renderNotifications(): JSX.Element[] {
        const notifications = [
            { text: 'Jaká je největší planeta sluneční soustavy?', type: 'Komentář' },
            { text: 'Jupiter', type: 'Komentář' },
            { text: 'VY Canis Majoris', type: 'Těleso' },
            { text: 'Io', type: 'Diskuse' },
            { text: 'Oxtimus', type: 'Uživatel' },
            { text: 'Kolikrát je slunce těžší, než všechny planety sluneční soustavy dohromady?', type: 'Diskuse' },
            { text: 'Kolikrát je slunce těžší, než všechny planety sluneční soustavy dohromady?', type: 'Komentář' },
            { text: 'Jaká je největší planeta sluneční soustavy?', type: 'Komentář' },
            { text: 'Jupiter', type: 'Komentář' },
            { text: 'VY Canis Majoris', type: 'Těleso' },
            { text: 'Io', type: 'Diskuse' },
            { text: 'Oxtimus', type: 'Uživatel' },
            { text: 'Kolikrát je slunce těžší, než všechny planety sluneční soustavy dohromady?', type: 'Diskuse' },
            { text: 'Kolikrát je slunce těžší, než všechny planety sluneční soustavy dohromady?', type: 'Komentář' },
            { text: 'VY Canis Majoris', type: 'Těleso' },
            { text: 'Io', type: 'Diskuse' },
            { text: 'Oxtimus', type: 'Uživatel' },
            { text: 'Kolikrát je slunce těžší, než všechny planety sluneční soustavy dohromady?', type: 'Diskuse' },
            { text: 'Kolikrát je slunce těžší, než všechny planety sluneční soustavy dohromady?', type: 'Komentář' },
            { text: 'Jaká je největší planeta sluneční soustavy?', type: 'Komentář' },
            { text: 'Jupiter', type: 'Komentář' },
            { text: 'VY Canis Majoris', type: 'Těleso' },
            { text: 'Io', type: 'Diskuse' }
        ]

        return notifications.map((notification, key) => (
            <Link
                target={Link.URLS.HOME}
                className={'notifications__notification notifications__notification--' + this.getClassNameSuffix(notification)}
                key={key}>
                <section className='notifications__front'>
                    <section className='notifications__front--inner'>
                        {notification.text}
                    </section>
                </section>
                <section className='notifications__back'>
                    <section className='notifications__age'>
                        11 měs.
                    </section>
                    {notification.type}
                </section>
            </Link>
        ))

    }

    public render(): JSX.Element {
        return (
            <Masonry
                className={'notifications'}
                elementType={'section'}
                options={masonryOptions}>
                {this.renderNotifications()}
            </Masonry>
        )
    }

}

export default Notifications