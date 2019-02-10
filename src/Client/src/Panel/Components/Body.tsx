import * as ClassNames from 'classnames'
import * as React from 'react'

import { StatelessComponent, Url, Queries, AsyncEntity, QueryMenu } from '../../Utils'
import { BodyPreview, getBodies, getBodyById, Physics } from '../../Universe'
import BodyData from './BodyData'
import BodyTimeline from './BodyTimeline'
import BodyDiscussion from './BodyDiscussion'

interface IProps {
    strings: IStrings
    bodies: IAsyncEntity<ISimpleBody[]>
    body: IAsyncEntity<IBody>
    getBodies: IRunnable
    getBodyById: IConsumer<string>
}

/**
 * Panel tab for body detail.
 */
class Body extends StatelessComponent<IProps> {

    public componentWillMount(): void {
        const { bodies, getBodies } = this.props

        if (!Url.hasQuery(Queries.BODY_TAB)) {
            Url.replace({ query: { [Queries.BODY_TAB]: Queries.BODY_DATA } })
        }

        AsyncEntity.request(bodies, getBodies)

        if (bodies.payload) {
            this.getBody()
        }
    }

    public componentDidUpdate(prevProps: IProps): void {
        const { bodies } = this.props

        if (!prevProps.bodies.payload && bodies.payload) {
            this.getBody()
        }
    }

    private getBody(): void {
        const { bodies, body, getBodyById } = this.props

        let bodyData = bodies.payload.find(body => body.name === Url.getQuery(Queries.BODY))

        if (!bodyData) {
            Url.setQuery(Queries.BODY, Physics.INITIAL_BODY)
            bodyData = bodies.payload.find(body => body.name === Physics.INITIAL_BODY)
        }

        return AsyncEntity.request(body, () => getBodyById(bodyData._id), true)
    }

    /**
     * Render content of panel depends on URI.
     * @returns Content.
     */
    private renderContent(): React.ReactNode {
        const { location } = this.props
        const currentTab = Url.getQuery(Queries.BODY_TAB, location.search)

        switch (currentTab) {
            case Queries.BODY_DATA:
                return <BodyData />
            case Queries.BODY_TIMELINE:
                return <BodyTimeline />
            case Queries.BODY_DISCUSSION:
                return <BodyDiscussion />
            default:
                return <BodyData />
        }
    }

    public render(): React.ReactNode {
        const { bodies, body } = this.props
        const currentTab = Url.getQuery(Queries.BODY_TAB, location.search)

        return (
            <section
                className={ClassNames('panel__body', 'panel__window', { 'panel__body--title': currentTab === Queries.BODY_DATA })}>
                <section className='panel__window__body'>
                    <section className='panel__window__body--scroll'>
                        <AsyncEntity
                            data={bodies}
                            success={() => (
                                <AsyncEntity
                                    data={body}
                                    success={() => (
                                        <>
                                            <BodyPreview body={body.payload} size={300} />
                                            {this.renderContent()}
                                        </>
                                    )} />
                            )} />
                    </section>
                </section>
                <QueryMenu
                    query={Queries.BODY_TAB}
                    links={{
                        'Data': Queries.BODY_DATA,
                        'Časová osa': Queries.BODY_TIMELINE,
                        'Diskuse': Queries.BODY_DISCUSSION
                    }}
                    className='panel__window__menu' />
            </section>
        )
    }

}

export default Body.connect(
    ({ universe }: IStoreState) => ({
        bodies: universe.bodies,
        body: universe.body
    }),
    { getBodies, getBodyById }
)