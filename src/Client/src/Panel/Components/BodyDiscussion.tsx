import * as React from 'react'

import { StatelessComponent, AsyncEntity, DataTable, DropdownArea, DropdownButton } from '../../Utils'
import BodyPost from './BodyPost'
import { toggleNewDiscussion, getDiscussions } from '../../Universe'
import DiscussionForm from './DiscussionForm'
import users from '../../../../Controllers/users'

interface IProps {
    identity: IAsyncEntity<Universis.User.Identity>
    discussions: IAsyncEntity<Universis.Discussion[]>
    isNewDiscussionExpanded: boolean
    toggleNewDiscussion: Universis.Consumer<boolean>
    getDiscussions: Universis.Consumer<string>
    bodyId: string
}

class BodyTimeline extends StatelessComponent<IProps> {

    public componentWillMount(): void {
        const { discussions, getDiscussions, bodyId } = this.props
        AsyncEntity.request(discussions, () => getDiscussions(bodyId))
    }

    public componentDidUpdate(prevProps: IProps): void {
        const { discussions } = this.props

        if (prevProps.discussions.payload && discussions.payload && prevProps.discussions.payload.length !== discussions.payload.length) {
            this.forceUpdate()
        }
    }

    /**
     * Render discussions.
     * @returns List of discussions.
     */
    private renderDiscussions(): React.ReactNode {
        return this.props.discussions.payload.map((post, key) => (
            <BodyPost post={post} key={key} />
        ))
    }

    /**
     * Render button for toggle new discussion.
     * @returns Button.
     */
    private renderToggleNewDiscussion = (): React.ReactNode => {
        const { isNewDiscussionExpanded, toggleNewDiscussion } = this.props

        return (
            <DropdownButton
                isExpanded={isNewDiscussionExpanded}
                label={'Založit novou diskusi'}
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
        const { discussions } = this.props

        const users = []

        for (const discussion of discussions.payload) {
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
                    'Diskusí': discussions.payload.length,
                    'Odpovědí': discussions.payload.reduce((count, discussion) => count + discussion.answers.length, 0),
                    'Uživatelů': users.length
                }} />
                <DataTable data={{
                    'Nejoblíbenější': 'Václav',
                    'Nejaktivnější': 'Michal',
                    '': this.renderToggleNewDiscussion
                }} />
            </header>
        )
    }

    public render(): React.ReactNode {
        const { discussions } = this.props

        return (
            <AsyncEntity
                data={discussions}
                success={() => (
                    <section className='panel__body__discussion'>
                        {this.renderHeader()}
                        {this.renderNewDiscussion()}
                        <section className='panel__body__discussion__posts'>
                            {this.renderDiscussions()}
                        </section>
                    </section>
                )} />
        )
    }

}

export default BodyTimeline.connect(
    ({ universe }: IStoreState) => ({
        discussions: universe.discussions,
        isNewDiscussionExpanded: universe.isNewDiscussionExpanded
    }),
    { toggleNewDiscussion, getDiscussions }
)