import * as React from 'react'

import AuthenticationControl from './AuthenticationControl'
import FullScreenControl from './FullScreenControl'
import AboutControl from './AboutControl'
import HomeControl from './HomeControl'
import ViewSizeControl from './ViewSizeControl'
import ApprovalsControl from './ApprovalsControl'
import { UILayout, SimpleComponent } from '../../Utils'

/**
 * Component for control panel.
 */
class ControlPanel extends SimpleComponent {

    public render(): React.ReactNode {
        return (
            <UILayout
                onClick={event => event.stopPropagation()}
                className='control-panel'>
                <FullScreenControl />
                <AboutControl />
                <HomeControl />
                <AuthenticationControl />
                <ApprovalsControl />
                <ViewSizeControl />
            </UILayout>
        )
    }

}

export default ControlPanel.connect()