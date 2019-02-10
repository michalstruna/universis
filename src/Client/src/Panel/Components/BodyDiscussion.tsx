import * as React from 'react'

import { StatelessComponent, AsyncEntity } from '../../Utils'
import BodyPost from './BodyPost'

interface IProps {
    identity: IAsyncEntity<Universis.User.Identity>
    posts: IAsyncEntity<Universis.Topic[]>
}

class BodyTimeline extends StatelessComponent<IProps> {

    /**
     * Render posts.
     * @returns List of posts.
     */
    private renderPosts(): React.ReactNode {
        return this.props.posts.payload.map((post, key) => (
            <BodyPost post={post} key={key} index={key} />
        ))
    }

    public render(): React.ReactNode {
        const { posts } = this.props

        return (
            <AsyncEntity
                data={posts}
                success={() => (
                    <section className='panel__body__discussion'>
                        <header className='panel__body__discussion__header'>

                        </header>
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
        posts: universe.posts
    })
)