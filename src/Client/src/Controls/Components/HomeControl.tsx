import * as React from 'react'

import ControlLink from './ControlLink'
import { StatelessComponent, Urls } from '../../Utils'

export interface IProps {
    strings: {
        home: string
    }
}

/**
 * Component for redirect to home.
 */
class HomeControl extends StatelessComponent<IProps> {

    public render(): JSX.Element {
        return (
            <ControlLink
                name={'home'}
                label={this.props.strings.home}
                target={Urls.HOME} />
        )
    }

}

export default HomeControl.connect(({ system }: any) => ({
    strings: system.strings.controls
}))