import * as React from 'react'

import { StatelessComponent, AsyncEntity, DataTable, DropdownArea, DropdownButton } from '../../Utils'
import BodyPost from './BodyPost'
import { toggleNewDiscussion } from '../../Universe'
import DiscussionForm from './DiscussionForm'

interface IProps {
    identity: IAsyncEntity<Universis.User.Identity>
    posts: IAsyncEntity<Universis.Discussion[]>
    isNewDiscussionExpanded: boolean
    toggleNewDiscussion: Universis.Consumer<boolean>
}

class BodyTimeline extends StatelessComponent<IProps> {

    public componentDidUpdate(prevProps: IProps): void {
        if (prevProps.posts.payload.length !== this.props.posts.payload.length) {
            this.forceUpdate()
        }
    }

    /**
     * Render posts.
     * @returns List of posts.
     */
    private renderPosts(): React.ReactNode {
        return this.props.posts.payload.map((post, key) => (
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

    public render(): React.ReactNode {
        const { posts } = this.props

        return (
            <AsyncEntity
                data={posts}
                success={() => (
                    <section className='panel__body__discussion'>
                        <header className='panel__body__discussion__header'>
                            <DataTable data={{ 'Diskusí': 16, 'Odpovědí': 93, 'Uživatelů': 4 }} />
                            <DataTable data={{
                                'Nejoblíbenější': 'Václav',
                                'Nejaktivnější': 'Michal',
                                '': this.renderToggleNewDiscussion
                            }} />
                        </header>
                        {this.renderNewDiscussion()}
                        <section className='panel__body__discussion__posts'>
                            {this.renderPosts()}
                        </section>
                    </section>
                )} />
        )
    }

}

export default BodyTimeline.connect(
    ({ universe }: IStoreState) => ({
        posts: universe.posts,
        isNewDiscussionExpanded: universe.isNewDiscussionExpanded
    }),
    { toggleNewDiscussion }
)