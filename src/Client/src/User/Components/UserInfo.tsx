import * as React from 'react'

import { StatelessComponent, Link, Units } from '../../Utils'
import { ContextInfo } from '../../Controls'

interface IProps {
    type: UserInfoTypes
    user?: Universis.User.Simple
}

/**
 * List of all user info types.
 */
enum UserInfoTypes {
    LARGE = 'large',
    MEDIUM = 'medium',
    SMALL = 'small'
}

/**
 * Component for user short info.
 */
class UserInfo extends StatelessComponent<IProps> {

    public static readonly DEFAULT_USER = {
        email: null,
        name: 'Nepřihlášený',
        avatar: '/Images/User/Avatar.svg',
        roles: [],
        score: {
            gold: 0,
            silver: 0,
            bronze: 0,
            karma: 0
        }
    }

    public static TYPES = UserInfoTypes

    private getColorFromKarma(): string {
        const currentKarma = Math.round(this.getUser().score.karma)
        const karma = Math.min(Math.max(currentKarma, -100), 100)
        const color = 200 - Math.abs(karma / 100) * 200

        if (karma > 0) {
            return `rgb(${color}, 230, ${color})`
        } else if (karma < 0) {
            return `rgb(230, ${color}, ${color})`
        } else {
            return 'rgb(230, 230, 230)'
        }
    }

    private renderType(): React.ReactNode {
        switch (this.props.type) {
            case UserInfoTypes.SMALL:
                return this.renderSmall()
            case UserInfoTypes.MEDIUM:
                return this.renderMedium()
            case UserInfoTypes.LARGE:
                return this.renderLarge()
        }
    }

    /**
     * Get user.
     */
    private getUser(): Universis.User.Simple {
        const { user } = this.props

        if (!user) {
            return UserInfo.DEFAULT_USER
        }

        return user
    }

    /**
     * Get user reputation.
     */
    private getReputation(): number {
        const user = this.getUser()
        return Math.floor((user.score.gold + user.score.silver + user.score.bronze) / 3)
    }

    private renderSmall(): React.ReactNode {
        const user = this.getUser()


        return (
            <ContextInfo
                className='user-info--small'
                content={<UserInfo type={UserInfo.TYPES.LARGE} user={user} />}>
                <Link
                    className='user-info__avatar'
                    target={Link.URLS.HOME}
                    style={{ backgroundImage: `url(${user.avatar || UserInfo.DEFAULT_USER.avatar})` }} />
            </ContextInfo>
        )
    }

    private renderMedium(): React.ReactNode {
        const user = this.getUser()

        return (
            <React.Fragment>
                <Link
                    className='user-info__avatar'
                    target={Link.URLS.HOME}
                    style={{ backgroundImage: `url(${user.avatar || UserInfo.DEFAULT_USER.avatar})` }} />
                <section className='user-info--right'>
                    <Link
                        className='user-info__name'
                        target={Link.URLS.HOME}
                        style={{ color: this.getColorFromKarma() }}>
                        {user.name}
                    </Link>
                    <section className='user-info__reputation'>
                        {Units.toShort(this.getReputation())}
                    </section>
                    <section className='user-info__last-online'>
                        11 měs.
                    </section>
                </section>
            </React.Fragment>
        )
    }

    private renderLarge(): React.ReactNode {
        const user = this.getUser()

        return (
            <React.Fragment>
                <Link
                    className='user-info__avatar'
                    target={Link.URLS.HOME}
                    style={{ backgroundImage: `url(${user.avatar || UserInfo.DEFAULT_USER.avatar})` }} />
                <section className='user-info--right'>
                    <Link
                        className='user-info__name'
                        target={Link.URLS.HOME}
                        style={{ color: this.getColorFromKarma() }}>
                        {user.name}
                    </Link>
                    <section className='user-info__score'>
                        <section className='user-info__reputation'>
                            {Units.toShort(this.getReputation())}
                        </section>
                        <section className='user-info__badge user-info__badge--gold'>
                            {Units.toShort(user.score.gold)}
                        </section>
                        <section className='user-info__badge user-info__badge--silver'>
                            {Units.toShort(user.score.silver)}
                        </section>
                        <section className='user-info__badge user-info__badge--bronze'>
                            {Units.toShort(user.score.bronze)}
                        </section>
                    </section>
                    <section className='user-info__last-online'>
                        11 měs.
                    </section>
                </section>
            </React.Fragment>
        )
    }

    public render(): React.ReactNode {
        return (
            <section className={'user-info user-info--' + this.props.type}>
                {this.renderType()}
            </section>
        )
    }

}

export default UserInfo