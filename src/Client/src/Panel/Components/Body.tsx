import * as React from 'react'

import { StatelessComponent, Url, Queries, AsyncEntity, QueryMenu } from '../../Utils'
import { getBodies, getBodyById, Physics } from '../../Universe'

interface IProps {
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
        const { bodies, body, getBodyById, } = this.props

        let bodyData = bodies.payload.find(body => body.name === Url.getQuery(Queries.BODY))

        if (!bodyData) {
            Url.setQuery(Queries.BODY, Physics.INITIAL_BODY)
            bodyData = bodies.payload.find(body => body.name === Physics.INITIAL_BODY)
        }

        AsyncEntity.request(body, () => getBodyById(bodyData._id), true)
    }

    public render(): React.ReactNode {
        const { body } = this.props

        return (
            <section className='panel__body panel__window'>
                <section className='panel__window__body'>
                    <section className='panel__window__body--scroll'>
                        <AsyncEntity
                            data={body} />
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