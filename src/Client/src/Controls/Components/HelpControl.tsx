import * as React from 'react'

import ControlLink from './ControlLink'
import { StatelessComponent, Urls } from '../../Utils'

export interface IProps {
    strings: {
        help: string
    }
}

/**
 * Component for redirect to help.
 */
class HelpControl extends StatelessComponent<IProps> {

    public render(): JSX.Element {
        return (
            <ControlLink
                name={'help'}
                label={this.props.strings.help}
                target={Urls.HELP} />
        )
    }

}

export default HelpControl.connect(({ system }: IStoreState) => ({
    strings: system.strings.controls
}))