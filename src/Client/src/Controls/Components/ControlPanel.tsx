import * as React from 'react'

import AuthenticationControl from './AuthenticationControl'
import FullScreenControl from './FullScreenControl'
import HelpControl from './HelpControl'
import HomeControl from './HomeControl'
import ViewSizeControl from './ViewSizeControl'
import { UILayout, SimpleComponent } from '../../Utils'

/**
 * Component for control panel.
 */
class ControlPanel extends SimpleComponent {

    public render(): JSX.Element {
        return (
            <UILayout
                onClick={event => event.stopPropagation()}
                className='control-panel'>
                <FullScreenControl />
                <HelpControl />
                <HomeControl />
                <AuthenticationControl />
                <ViewSizeControl />
            </UILayout>
        )
    }

}

export default ControlPanel.connect()