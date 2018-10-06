import * as React from 'react'

import ControlLink from './ControlLink'
import Control from './Control'
import { StatelessComponent, Urls, Url } from '../../Utils'
import UserActions from '../../User/Redux/UserActions'

export interface IProps {
    strings: IStrings
    identity: IUserIdentity
    logout: IRunnable
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

    public render(): JSX.Element {
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
                    target={Urls.IDENTITY} />
            )
        }
    }

}

export default AuthentificationControl.connect(
    ({ system, user }: IStoreState) => ({
        strings: system.strings.controls,
        identity: user.identity.payload
    }),
    (dispatch: IDispatch) => ({
        logout: () => dispatch(UserActions.logout())
    })
)