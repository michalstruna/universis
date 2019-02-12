import * as ClassNames from 'classnames'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { RelativeTime, Component, Html, DropdownArea, DropdownButton } from '../../Utils'
import { UserInfo } from '../../User'
import { toggleTopic, vote } from '../../Universe'
import Arrays from '../../../../Utils/Arrays'
import AnswerForm from './AnswerForm'

interface IProps {
    identity: IAsyncEntity<Universis.User.Identity>
    post: Universis.Topic | Universis.Answer,
    toggleTopic?: Universis.Consumer2<string, boolean>
    parentId?: string
    vote: Universis.Consumer4<number, boolean, string, string>
}

interface IState {
    answersHeight: number
}

/**
 * Topic or answer for body.
 */
class BodyPost extends Component<IProps, IState> {

    /**
     * List of all answers elements.
     */
    private answersElements: BodyPost[]

    public constructor(props) {
        super(props)

        this.answersElements = []

        this.state = {
            answersHeight: 0
        }
    }

    public componentDidMount(): void {
        this.updateHeight()
    }

    public componentDidUpdate(prevProps: IProps): void {
        if (prevProps.post.answers.length !== this.props.post.answers.length) {
            this.updateHeight()
        }
    }

    private updateHeight() {
        let answersHeight = 55 + Arrays.sum(this.answersElements.filter(item => !!item).map(item => Html.getHeight(ReactDOM.findDOMNode(item) as HTMLElement)))
        this.setState({ answersHeight })
    }

    /**
     * Check if currently logged user is between users in array.
     * @param users List of users.
     * @returns Logged user is between users.
     */
    private isBetween = (users: Universis.User.Simple[]): boolean => {
        const { identity } = this.props

        return !!users.find(user => user._id === 'myself')

        /*if (!identity.payload) {
            return false
        }

        return !users.find(user => user._id === identity.payload._id)*/
    }

    /**
     * Render title of topic.
     * @returns Title.
     */
    private renderTitle(): React.ReactNode {
        const { post } = this.props

        if (!('title' in post)) {
            return null
        }

        return (
            <span className='panel__body__discussion__title'>
                {post.title}
            </span>
        )
    }

    /**
     * Render expand button, if there are any answers.
     * @returns Expand button.
     */
    private renderExpand(): React.ReactNode {
        const { post, toggleTopic } = this.props

        if (!('title' in post)) {
            return null
        }

        const showLabel = post.answers.length > 0 ? 'Zobrazit odpovědi (' + post.answers.length + ')' : 'Odpovědět'

        return (
            <DropdownButton
                isExpanded={post.isExpanded}
                label={post.isExpanded ? 'Skrýt odpovědi' : showLabel}
                onClick={() => toggleTopic(post._id, !post.isExpanded)} />
        )
    }

    /**
     * Render reply to topic.
     * @returns Reply form.
     */
    private renderReply(): React.ReactNode {
        const { post } = this.props

        if (!('title' in post)) {
            return null
        }

        return (
            <AnswerForm form={'answer__' + post._id} />
        )
    }

    /**
     * Render answers.
     * @returns Answers.
     */
    private renderAnswers(): React.ReactNode {
        const { post, identity, toggleTopic, vote } = this.props

        this.answersElements = []

        return post.answers.map((answer, key) => (
            <BodyPost
                ref={ref => this.answersElements.push(ref)}
                toggleTopic={toggleTopic}
                vote={vote}
                parentId={post._id}
                identity={identity}
                post={answer}
                key={key} />
        ))
    }

    /**
     * Render answers container.
     */
    private renderAnswersContainer(): React.ReactNode {
        const { post } = this.props
        const { answersHeight } = this.state

        if (!('title' in post)) {
            return null
        }

        return (
            <DropdownArea isExpanded={post.isExpanded} expandedHeight={answersHeight}>
                {this.renderReply()}
                {this.renderAnswers()}
            </DropdownArea>
        )
    }

    /**
     * Render post controls.
     */
    private renderControls(): React.ReactNode {
        const { post, parentId, vote } = this.props

        const agree = this.isBetween(post.agreements)
        const disagree = this.isBetween(post.disagreements)

        return (
            <section className='panel__body__discussion__controls'>
                <button
                    onClick={() => vote(1, !agree, post._id, parentId)}
                    className={ClassNames(
                        'panel__body__discussion__up',
                        { 'panel__body__discussion__up--active': agree }
                    )} />
                <span className='panel__body__discussion__up-count'>
                            {post.agreements.length || ''}
                        </span>
                <button
                    onClick={() => vote(-1, !disagree, post._id, parentId)}
                    className={ClassNames(
                        'panel__body__discussion__down',
                        { 'panel__body__discussion__down--active': disagree }
                    )} />
                <span className='panel__body__discussion__down-count'>
                            {post.disagreements.length || ''}
                        </span>
                {this.renderExpand()}
            </section>
        )
    }

    public render(): React.ReactNode {
        const { post } = this.props

        return (
            <section className='panel__body__discussion__post'>
                <UserInfo type={UserInfo.TYPES.SMALL} user={post.user} />
                <section className='panel__body__discussion__body'>
                    <section className='panel__body__discussion__metadata'>
                        {this.renderTitle()}
                        <span className='panel__body__discussion__author'>
                            {post.user.name}
                        </span>
                        <span className='panel__body__discussion__date'>
                            <RelativeTime date={post.date} />
                        </span>
                    </section>
                    <section className='panel__body__discussion__content'>
                        {post.content}
                    </section>
                    {this.renderControls()}
                    {this.renderAnswersContainer()}
                </section>
            </section>
        )
    }

}

export default BodyPost.connect(
    ({ user, universe }: IStoreState) => ({
        identity: user.identity,
        posts: universe.posts
    }),
    { toggleTopic, vote }
)