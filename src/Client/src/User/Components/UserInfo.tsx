import * as React from 'react'

import { StatelessComponent, Link, Numbers } from '../../Utils'

interface IProps {
    type: UserInfoTypes
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

    private renderScore(): JSX.Element {
        const score = {
            gold: 999,
            silver: 999,
            bronze: 999,
            karma: 56,
            reputation: 999
        }

        return (
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
        )
    }

    public render(): JSX.Element {
        const avatarUrl = 'https://vignette.wikia.nocookie.net/evilbabes/images/2/2b/Esdeath_Quote_%28Akame_ga_Kill_Ep_10%29.png/revision/latest?cb=20160212175749'

        return (
            <section className={'user-info user-info--' + this.props.type}>
                <Link
                    className='user-info__avatar'
                    target={Link.URLS.HOME}
                    style={{ backgroundImage: `url(${avatarUrl}})` }} />
                <section className='user-info--right'>
                    <Link
                        className='user-info__name'
                        target={Link.URLS.HOME}
                        style={{ color: this.getColorFromKarma() }}>
                        Michal Struna
                    </Link>
                    {this.renderScore()}
                    <section className='user-info__last-online'>
                        11 měs.
                    </section>
                </section>
            </section>
        )
    }

}

export default UserInfo