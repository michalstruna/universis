import * as React from 'react'

import ControlLink from './ControlLink'
import { StatelessComponent, Urls } from '../../Utils'

export interface IProps {
    strings: Universis.Strings
}

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
        strings: system.strings.controls
    })
)