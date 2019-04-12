import * as React from 'react'

import { getBodies, getBodyTypes } from '../../Universe'
import Bodies from './Bodies'
import BodyTypes from './BodyTypes'

import {
    StatelessComponent,
    AsyncEntity,
    Url,
    Queries,
    QueryMenu
} from '../../Utils'

interface IProps {
    bodies: Universis.Redux.AsyncEntity<Universis.Universe.Body.Simple[]>
    selectBody: Universis.Consumer<string>
    filter: Universis.Filter
    getBodies: Universis.Runnable
    strings: Universis.Strings
    toggleBodyForm: Universis.Consumer<boolean>
    isFormVisible: boolean
    bodyTypes: Universis.Redux.AsyncEntity<Universis.Universe.Body.Type[]>
    getBodyTypes: Universis.Runnable
}

/**
 * Components for chat.
 */
class Database extends StatelessComponent<IProps> {

    public componentWillMount(): void {
        const { bodies, getBodies, bodyTypes, getBodyTypes } = this.props
        AsyncEntity.request(bodies, getBodies)
        AsyncEntity.request(bodyTypes, getBodyTypes)
    }

    private renderContent(): React.ReactNode {
        const { location } = this.props
        const currentTab = Url.getQuery(Queries.DATABASE_TAB, location.search)

        switch (currentTab) {
            case Queries.BODY_TYPES:
                return <BodyTypes />
            default:
                return <Bodies />
        }
    }

    public render(): React.ReactNode {
        const { strings, bodyTypes, bodies } = this.props

        return (
            <AsyncEntity
                data={bodies}
                success={() => (
                    <AsyncEntity
                        data={bodyTypes}
                        success={() => (
                            <>
                                {this.renderContent()}
                                <QueryMenu
                                    query={Queries.DATABASE_TAB}
                                    links={{
                                        [`${strings.bodies} (${bodies.payload.length})`]: Queries.BODIES,
                                        [`${strings.bodyTypes} (${bodyTypes.payload.length})`]: Queries.BODY_TYPES
                                    }}
                                    className='panel__window__menu' />
                            </>
                        )} />
                )} />
        )
    }

}

export default Database.connect(
    ({ universe, system }: Universis.Redux.StoreState) => ({
        bodies: universe.bodies,
        strings: system.strings.database,
        bodyTypes: universe.bodyTypes
    }),
    { getBodies, getBodyTypes }
)