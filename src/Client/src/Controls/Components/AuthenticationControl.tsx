import * as React from 'react'

import ControlLink from './ControlLink'
import { StatelessComponent, Urls, Url } from '../../Utils'

export interface IProps {
    strings: {
        logIn: string
    }
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

    public render(): JSX.Element {
        return (
            <ControlLink
                isVisible={this.isVisible}
                name={'login'}
                label={this.props.strings.logIn}
                target={Urls.IDENTITY} />
        )
    }

}

export default AuthentificationControl.connect(({ system }: IStoreState) => ({
    strings: system.strings.controls
}))