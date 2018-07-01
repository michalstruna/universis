import * as React from 'react'

import Control from './Control'
import { SystemActions } from '../../System'
import { StatelessComponent } from '../../Utils'


export interface IProps {
    alert: {
        title: string
        content: string
        buttons: ILinkButton[]
    }
    showAlert: ITripleConsumer<string, string, ILinkButton[]>
    strings: {
        about: string
    }
}

/**
 * Component for toggle full screen.
 */
class AboutControl extends StatelessComponent<IProps> {

    /**
     * After click, show alert.
     */
    private handleClick = (event: React.MouseEvent<HTMLElement>): void => {
        const { alert, showAlert } = this.props
        showAlert(alert.title, alert.content, alert.buttons)
    }

    public render(): JSX.Element {
        return (
            <Control
                isVisible={true}
                onClick={this.handleClick}
                name='help'
                label={this.props.strings.about} />
        )
    }
}

export default AboutControl.connect(({ system }: any) => ({
    strings: system.strings.controls,
    alert: system.strings.alert.about
}), (dispatch: any) => ({
    showAlert: (title: string, content: string, buttons: ILinkButton[]) => dispatch(SystemActions.showAlert(title, content, buttons))
}))