import * as React from 'react'

import { StatelessComponent, Link, Numbers } from '../../Utils'

//const avatarUrl = 'https://vignette.wikia.nocookie.net/evilbabes/images/2/2b/Esdeath_Quote_%28Akame_ga_Kill_Ep_10%29.png/revision/latest?cb=20160212175749' // TODO: Remove
const avatarUrl = 'https://s3.amazonaws.com/cdn.roosterteeth.com/uploads/images/1f26bf45-d6ba-4650-8757-b94c69413973/md/2166131-1448257742824-tumblr_nseo5sJWL21ubrv41o1_250.png'


const score = {
    gold: 999,
    silver: 999,
    bronze: 999,
    karma: 56,
    reputation: 999
} // TODO: Remove

interface IProps {
    type: UserInfoTypes
    user?: IBaseUser
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

    public static TYPES = UserInfoTypes

    private getColorFromKarma(): string {
        const currentKarma = Math.round(Math.random() * 200 - 100)
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

    private renderSmall(): React.ReactNode {
        return (
            <Link
                className='user-info__avatar'
                target={Link.URLS.HOME}
                style={{ backgroundImage: `url(${avatarUrl})` }} />
        )
    }

    private renderMedium(): React.ReactNode {
        return (
            <React.Fragment>
                <Link
                    className='user-info__avatar'
                    target={Link.URLS.HOME}
                    style={{ backgroundImage: `url(${avatarUrl})` }} />
                <section className='user-info--right'>
                    <Link
                        className='user-info__name'
                        target={Link.URLS.HOME}
                        style={{ color: this.getColorFromKarma() }}>
                        Michal Struna
                    </Link>
                    <section className='user-info__reputation'>
                        {Numbers.toShort(score.reputation)}
                    </section>
                    <section className='user-info__last-online'>
                        11 měs.
                    </section>
                </section>
            </React.Fragment>
        )
    }

    private renderLarge(): React.ReactNode {
        let { user } = this.props

        if (!user) {
            //return null

            user = {
                _id: 'abc',
                email: 'michal@struna.cz',
                name: 'Michal',
                avatar: 'Avatar',
                roles: []
            }
        }

        return (
            <React.Fragment>
                <Link
                    className='user-info__avatar'
                    target={Link.URLS.HOME}
                    style={{ backgroundImage: `url(${avatarUrl})` }} />
                <section className='user-info--right'>
                    <Link
                        className='user-info__name'
                        target={Link.URLS.HOME}
                        style={{ color: this.getColorFromKarma() }}>
                        {user.name}
                    </Link>
                    <section className='user-info__score'>
                        <section className='user-info__reputation'>
                            {Numbers.toShort(score.reputation)}
                        </section>
                        <section className='user-info__badge user-info__badge--gold'>
                            {Numbers.toShort(score.gold)}
                        </section>
                        <section className='user-info__badge user-info__badge--silver'>
                            {Numbers.toShort(score.silver)}
                        </section>
                        <section className='user-info__badge user-info__badge--bronze'>
                            {Numbers.toShort(score.bronze)}
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