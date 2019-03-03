import * as React from 'react'

import Control from './Control'
import { toggleAlert } from '../../System'
import { StatelessComponent } from '../../Utils'

export interface IProps {
    alert: {
        title: string
        content: string
        buttons: ILinkButton[]
    }
    toggleAlert: Universis.Consumer4<boolean, string, string, ILinkButton[]>
    strings: {
        about: string
    }
}

/**
 * Component for show alert about project.
 */
class AboutControl extends StatelessComponent<IProps> {

    /**
     * After click, show alert.
     */
    private handleClick = (event: React.MouseEvent<HTMLElement>): void => {
        const { alert, toggleAlert } = this.props
        toggleAlert(true, alert.title, alert.content, alert.buttons)
    }

    public render(): React.ReactNode {
        return (
            <Control
                isVisible={true}
                onClick={this.handleClick}
                name='help'
                label={this.props.strings.about} />
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