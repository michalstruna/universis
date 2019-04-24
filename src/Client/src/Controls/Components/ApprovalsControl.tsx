import * as React from 'react'

import ControlLink from './ControlLink'
import { StatelessComponent, Urls } from '../../Utils'

export interface IProps {
    strings: Universis.Strings
    identity: Universis.User.Identity
}

/**
 * Component for redirect to unapproved items.
 */
class ApprovalsControl extends StatelessComponent<IProps> {

    public render(): React.ReactNode {
        const { strings, identity } = this.props

        return (
            <ControlLink
                name={'approvals'}
                label={strings.approvals}
                target={Urls.APPROVALS} />
        )
    }

}

export default ApprovalsControl.connect(
    ({ system, user }: Universis.Redux.StoreState) => ({
        strings: system.strings.controls,
        identity: user.identity.payload
    })
)