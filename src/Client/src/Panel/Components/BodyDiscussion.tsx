import * as React from 'react'

import { StatelessComponent, DataTable, DropdownArea, DropdownButton } from '../../Utils'
import BodyPost from './BodyPost'
import { toggleNewDiscussion } from '../../Universe'
import DiscussionForm from './DiscussionForm'

interface IProps {
    identity: Universis.Redux.AsyncEntity<Universis.User.Identity>
    discussions: Universis.Redux.AsyncEntity<Universis.Discussion[]>
    isNewDiscussionExpanded: boolean
    toggleNewDiscussion: Universis.Consumer<boolean>
    body: Universis.Redux.AsyncEntity<Universis.Universe.Body>
    strings: Universis.Strings
}

class BodyDiscussion extends StatelessComponent<IProps> {

    public componentDidUpdate(prevProps: IProps): void {
        const { body } = this.props

        if (prevProps.body.payload && body.payload && prevProps.body.payload.discussions.length !== body.payload.discussions.length) {
            this.forceUpdate()
        }
    }

    /**
     * Render discussions.
     * @returns List of discussions.
     */
    private renderDiscussions(): React.ReactNode {
        return this.props.body.payload.discussions.map((post, key) => (
            <BodyPost post={post} key={key} />
        ))
    }

    /**
     * Render button for toggle new discussion.
     * @returns Button.
     */
    private renderToggleNewDiscussion = (): React.ReactNode => {
        const { isNewDiscussionExpanded, toggleNewDiscussion, strings } = this.props

        return (
            <DropdownButton
                isExpanded={isNewDiscussionExpanded}
                label={strings.newDiscussion}
                onClick={() => toggleNewDiscussion(!isNewDiscussionExpanded)} />
        )
    }

    private renderNewDiscussion(): React.ReactNode {
        const { isNewDiscussionExpanded } = this.props

        return (
            <DropdownArea isExpanded={isNewDiscussionExpanded} className='panel__body__discussion__new'>
                <DiscussionForm />
            </DropdownArea>
        )
    }

    private renderHeader(): React.ReactNode {
        const { body, strings } = this.props

        const users = []

        for (const discussion of body.payload.discussions) {
            if ((discussion.user && !users.includes(discussion.user._id)) || !users.includes(discussion.ip)) {
                users.push(discussion.user ? discussion.user._id : discussion.ip)
            }

            for (const answer of discussion.answers) {
                if ((answer.user && !users.includes(answer.user._id)) || !users.includes(answer.ip)) {
                    users.push(answer.user ? answer.user._id : answer.ip)
                }
            }
        }

        return (
            <header className='panel__body__discussion__header'>
                <DataTable data={{
                    [strings.discussionsCount]: body.payload.discussions.length,
                    [strings.answersCount]: body.payload.discussions.reduce((count, discussion) => count + discussion.answers.length, 0),
                    [strings.usersCount]: users.length
                }} />
                <DataTable data={{
                    [strings.mostFavorite]: 'Václav',
                    [strings.mostActive]: 'Michal',
                    '': this.renderToggleNewDiscussion
                }} />
            </header>
        )
    }

    public render(): React.ReactNode {
        if (!this.props.body.payload) {
            return null
        }

        return (
            <section className='panel__body__discussion'>
                {this.renderHeader()}
                {this.renderNewDiscussion()}
                <section className='panel__body__discussion__posts'>
                    {this.renderDiscussions()}
                </section>
            </section>
        )
    }

}

export default BodyDiscussion.connect(
    ({ universe, system }: Universis.Redux.StoreState) => ({
        body: universe.body,
        isNewDiscussionExpanded: universe.isNewDiscussionExpanded,
        strings: system.strings.discussion
    }),
    { toggleNewDiscussion }
)