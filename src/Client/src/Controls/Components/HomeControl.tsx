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

    public render(): React.ReactNode {
        return (
            <ControlLink
                name={'home'}
                label={this.props.strings.home}
                target={Urls.HOME} />
        )
    }

}

export default HomeControl.connect(({ system }: IStoreState) => ({
    strings: system.strings.controls
}))