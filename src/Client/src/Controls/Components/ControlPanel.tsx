import * as React from 'react'

import AuthenticationControl from './AuthenticationControl'
import FullScreenControl from './FullScreenControl'
import HelpControl from './HelpControl'
import HomeControl from './HomeControl'
import { FadeLayout, StatelessComponent } from '../../Utils'

export interface IProps {
    isUIVisible: boolean
}

/**
 * Component for control panel.
 */
class ControlPanel extends StatelessComponent<IProps> {

    public render(): JSX.Element {
        return (
            <FadeLayout
                mounted={this.props.isUIVisible}
                onClick={event => event.stopPropagation()}
                className='control-panel'>
                <FullScreenControl />
                <HelpControl />
                <HomeControl />
                <AuthenticationControl />
            </FadeLayout>
        )
    }

}

export default ControlPanel.connect(
    ({ system }: any) => ({
        isUIVisible: system.isUIVisible
    })
)