import * as React from 'react'

import { StatelessComponent, Link, Units, RelativeTime } from '../../Utils'
import { ContextInfo } from '../../Controls'
import { UserRole } from '../../../../Constants'

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
    SMALL = 'small',
    NAME = 'name'
}

/**
 * Component for user short info.
 */
class UserInfo extends StatelessComponent<IProps> {

    public static readonly DEFAULT_USER = {
        email: null,
        name: 'Nepřihlášený',
        avatar: '',
        role: UserRole.UNAUTHANTICATED,
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
            case UserInfoTypes.NAME:
                return this.renderName()
        }
    }

    /**
     * Get user.
     */
    private getUser(): Universis.User.Simple {
        const { user } = this.props
        return { ...UserInfo.DEFAULT_USER, ...(user || {}) }
    }

    public static getAvatarPath(name?: string): string {
        return name && name.replace ? '/Images/Uploaded/' + name.replace(/\//gi, '') : '/Images/User/Avatar.svg'
    }

    /**
     * Get user reputation.
     */
    private getReputation(): number {
        const user = this.getUser()
        return Math.floor((user.score.gold * 20 + user.score.silver * 5 + user.score.bronze) / 3)
    }

    private renderSmall(): React.ReactNode {
        const user = this.getUser()

        return (
            <ContextInfo
                className='user-info--small'
                content={<UserInfo type={UserInfo.TYPES.LARGE} user={user} />}>
                <Link
                    className='user-info__avatar'
                    target={this.target}
                    style={{ backgroundImage: `url(${UserInfo.getAvatarPath(user.avatar)})` }} />
            </ContextInfo>
        )
    }

    private get target(): string {
        const user = this.getUser()

        if (!user) {
            return Link.URLS.HOME
        }

        return Link.URLS.USER + '/' + user._id
    }

    private renderLastOnline(): React.ReactNode {
        const user = this.getUser()

        if (!user.lastOnline) {
            return null
        }

        if (user.isOnline) {
            return 'aktivní'
        }

        return (
            <RelativeTime date={user.lastOnline} />
        )
    }

    private renderMedium(): React.ReactNode {
        const user = this.getUser()

        return (
            <React.Fragment>
                <Link
                    className={'user-info__avatar'}
                    target={this.target}
                    style={{ backgroundImage: `url(${UserInfo.getAvatarPath(user.avatar)})` }} />
                <section className='user-info--right'>
                    <Link
                        className={'user-info__name' + (user._id ? '' : ' user-info__link--disabled')}
                        target={this.target}
                        style={{ color: this.getColorFromKarma() }}>
                        {user.name}
                    </Link>
                    <section className='user-info__reputation'>
                        {Units.toShort(this.getReputation())}
                    </section>
                    <section className='user-info__last-online'>
                        {this.renderLastOnline()}
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
                    target={this.target}
                    style={{ backgroundImage: `url(${UserInfo.getAvatarPath(user.avatar)})` }} />
                <section className='user-info--right'>
                    <Link
                        className='user-info__name'
                        target={this.target}
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
                        {this.renderLastOnline()}
                    </section>
                </section>
            </React.Fragment>
        )
    }

    private renderName(): React.ReactNode {
        const user = this.getUser()
        return user ? user.name : 'Nepřihlášený'
    }

    public render(): React.ReactNode {
        const user = this.getUser()

        return (
            <section className={'user-info user-info--' + this.props.type + (user._id ? '' : ' user-info--default')}>
                {this.renderType()}
            </section>
        )
    }

}

export default UserInfo