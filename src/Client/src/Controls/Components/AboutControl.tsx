import * as React from 'react'

import Control from './Control'
import { StatelessComponent, Urls } from '../../Utils'

export interface IProps {
    strings: {
        about: string
    }
}

/**
 * Component for infor about portal.
 */
class AboutControl extends StatelessComponent<IProps> {

    public render(): JSX.Element {
        return (
            <Control
                isVisible={true}
                name={'help'}
                label={this.props.strings.about}
                target={Urls.HELP} />
        )
    }

}

export default AboutControl.connect(
    ({ system: { strings } }: any) => ({
        strings: strings.controls
    })
)