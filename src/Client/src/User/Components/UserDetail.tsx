import * as React from 'react'

import { StatelessComponent, Units, RelativeTime, DetailEditor, FadeLayout } from '../../Utils'
import { UserRole } from '../../../../Constants'
import { DonutChart, HorizontalBarChar } from '../../Charts'
import { toggleUserForm } from '../Redux/UserActions'
import UserForm from './UserForm'

interface IProps {
    user: Universis.User
    strings: Universis.Strings
    identity: Universis.Redux.AsyncEntity<Universis.User.Identity>
    toggleUserForm: Universis.Consumer<boolean>
    isFormVisible: boolean
}

class UserDetail extends StatelessComponent<IProps> {

    public componentDidMount(): void {
        this.props.toggleUserForm(false)
    }

    private static Row = ({ image, children }: { image?: string, children: React.ReactNode }) => {
        return (
            <p className='user-detail__row'
               style={{ backgroundImage: image ? `url(/Images/User/Detail/${image}.svg)` : undefined }}>
                {children}
            </p>
        )
    }

    /**
     * Get user reputation.
     */
    private get reputation(): number {
        const { user } = this.props
        return Math.floor((user.score.gold * 20 + user.score.silver * 5 + user.score.bronze) / 3)
    }

    private renderSexAgeLine(): React.ReactNode {
        const { user, strings } = this.props
        const born = user.born ? <>(<RelativeTime date={user.born} />)</> : null

        return (
            <UserDetail.Row
                image={user.isFemale === true ? 'Female' : (user.isFemale === false ? 'Male' : 'Human')}>
                {user.isFemale === true ? strings.female : (user.isFemale === false ? strings.male : strings.human)} {born}
            </UserDetail.Row>
        )
    }

    /**
     * Render info about user.
     */
    private renderInfo(): React.ReactNode {
        const { user, strings } = this.props

        return (
            <section className='user-detail__info'>
                <section className='user-detail__block user-detail__block--avatar'>
                    <section
                        className='user-detail__avatar'
                        style={{ backgroundImage: `url(/Images/User/Avatar.svg)` }} />
                    <section className='user-detail__reputation'>
                        <span className='user-detail__reputation--inner'>{this.reputation}</span> {strings.reputation}
                    </section>
                    <section className='user-detail__badges'>
                        <section className='user-detail__badge user-detail__badge--gold'>
                            {Units.toShort(user.score.gold)}
                        </section>
                        <section className='user-detail__badge user-detail__badge--silver'>
                            {Units.toShort(user.score.silver)}
                        </section>
                        <section className='user-detail__badge user-detail__badge--bronze'>
                            {Units.toShort(user.score.bronze)}
                        </section>
                    </section>
                </section>

                <section className='user-detail__block'>
                    {this.renderSexAgeLine()}
                    <UserDetail.Row image={'Home'}>
                        {user.home}
                    </UserDetail.Row>
                    <UserDetail.Row image={'Date'}>
                        {strings.from} <RelativeTime date={user.createdAt} />
                    </UserDetail.Row>
                    <UserDetail.Row image={'Online'}>
                        {user.isOnline ? strings.now : <>{strings.lastOnline} <RelativeTime
                            date={user.lastOnline} /></>}
                    </UserDetail.Row>
                </section>

                <section className='user-detail__block'>
                    <UserDetail.Row image={'Email'}>
                        <a href={'mailto:' + user.publicEmail}>
                            {user.publicEmail}
                        </a>
                    </UserDetail.Row>
                    <UserDetail.Row image={'Website'}>
                        <a href={user.website} target='_blank'>
                            {user.website.replace(/^(https?:\/\/)?(www\.)?/, '')}
                        </a>
                    </UserDetail.Row>
                    <UserDetail.Row image={'Facebook'}>
                        <a href={user.facebook} target='_blank'>
                            {user.facebook ? user.facebook.split('/').pop() : ''}
                        </a>
                    </UserDetail.Row>
                </section>
            </section>
        )
    }

    private renderEditor(): React.ReactNode {
        const { identity, user, toggleUserForm } = this.props

        if (!identity.payload || (identity.payload._id !== user._id && identity.payload.role !== UserRole.ADMIN)) {
            return null
        }

        return (
            <DetailEditor
                onDelete={() => alert('Pro smazání účtu kontaktujte administrátora.')}
                onEdit={() => toggleUserForm(true)} />
        )
    }

    private renderStats(): React.ReactNode {
        const { user, strings, isFormVisible } = this.props

        return (
            <section className='user-detail__stats'>
                <section className='user-detail__block'>
                    <h1 className='user-detail__name'>
                        {user.name}
                    </h1>
                    {this.renderEditor()}
                    <h2 className='user-detail__type'>
                        {user.role === UserRole.ADMIN ? strings.admin : strings.authenticated}
                    </h2>
                    <p className='user-detail__about'>
                        {user.about}
                    </p>
                </section>

                <section className='user-detail__block user-detail__votes'>
                    <section className='user-detail__block--left'>
                        <h3 className='user-detail__section-title'>
                            {strings.votes.in} ({user.votes.in.positive + user.votes.in.negative})
                        </h3>
                        <DonutChart
                            data={{
                                [strings.votes.positive]: user.votes.in.positive,
                                [strings.votes.negative]: user.votes.in.negative
                            }}
                            colors={['green', 'darkred']}
                            height={100}
                            width={100} />
                    </section>
                    <section className='user-detail__block--right'>
                        <h3 className='user-detail__section-title'>
                            {strings.votes.out} ({user.votes.out.positive + user.votes.out.negative})
                        </h3>
                        <DonutChart
                            data={{
                                [strings.votes.positive]: user.votes.out.positive,
                                [strings.votes.negative]: user.votes.out.negative
                            }}
                            colors={['green', 'darkred']}
                            height={100}
                            width={100} />
                    </section>
                </section>

                <section className='user-detail__block'>
                    <h3 className='user-detail__section-title'>
                        {strings.posts} ({user.posts.reduce((accumulator, post) => accumulator + post.count, 0)})
                    </h3>
                    <HorizontalBarChar
                        data={user.posts.map(post => ({ value: post.count, name: post.body }))}
                        height={10 + user.posts.length * 30} />
                </section>
            </section>
        )
    }

    public render(): React.ReactNode {
        const { isFormVisible } = this.props

        return (
            <section className='user-detail'>
                <FadeLayout
                    type={FadeLayout.SCALE}
                    mounted={isFormVisible}
                    className='user-detail__form'>
                    <UserForm />
                </FadeLayout>
                {this.renderInfo()}
                {this.renderStats()}
            </section>
        )
    }

}

export default UserDetail.connect(
    ({ system, user }: Universis.Redux.StoreState) => ({
        strings: system.strings.user,
        identity: user.identity,
        isFormVisible: user.isUserFormVisible
    }),
    { toggleUserForm }
)