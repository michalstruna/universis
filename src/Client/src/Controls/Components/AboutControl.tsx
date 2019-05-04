import * as React from 'react'

import ControlLink from './ControlLink'
import { toggleAlert } from '../../System'
import { StatelessComponent, Urls } from '../../Utils'

export interface IProps {
    alert: {
        title: string
        content: string
        buttons: ILinkButton[]
    }
    toggleAlert: Universis.Consumer4<boolean, string, string, ILinkButton[]>
    strings: Universis.Strings
}

/**
 * Component for show alert about project.
 */
class AboutControl extends StatelessComponent<IProps> {

    public render(): React.ReactNode {
        return (
            <ControlLink
                name={'help'}
                label={this.props.strings.about}
                target={Urls.ABOUT} />
        )
    }
}

export default AboutControl.connect(
    ({ system }: Universis.Redux.StoreState) => ({
        strings: system.strings.controls,
        alert: system.strings.alert.about
    }),
    { toggleAlert }
)