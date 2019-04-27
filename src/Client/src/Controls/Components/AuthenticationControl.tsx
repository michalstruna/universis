import * as React from 'react'

import ControlLink from './ControlLink'
import Control from './Control'
import { StatelessComponent, Urls, Url } from '../../Utils'
import { logout } from '../../User/Redux/UserActions'

export interface IProps {
    strings: Universis.Strings
    identity: Universis.User.Identity
    logout: Universis.Runnable
}

/**
 * Component for redirect to identity.
 */
class AuthentificationControl extends StatelessComponent<IProps> {

    /**
     * Check if control is visible.
     * @return Control is visible.
     */
    private isVisible = (): boolean => {
        const exceptUrls = [Urls.IDENTITY, Urls.LOGIN, Urls.SIGN_UP]
        let isVisible = true

        for (const i in exceptUrls) {
            if (Url.equalsPage(exceptUrls[i], this.props.location.pathname)) {
                isVisible = false
                break
            }
        }

        return isVisible
    }

    private handleLogout = () => {
        this.props.logout()
    }

    public render(): React.ReactNode {
        const { strings, identity } = this.props

        if (identity) {
            return (
                <Control
                    isVisible={true}
                    onClick={this.handleLogout}
                    name={'logout'}
                    label={strings.logout} />
            )
        } else {
            return (
                <ControlLink
                    isVisible={this.isVisible}
                    name={'login'}
                    label={strings.logIn}
                    target={Urls.LOGIN} />
            )
        }
    }

}

export default AuthentificationControl.connect(
    ({ system, user }: Universis.Redux.StoreState) => ({
        strings: system.strings.controls,
        identity: user.identity.payload
    }),
    { logout }
)