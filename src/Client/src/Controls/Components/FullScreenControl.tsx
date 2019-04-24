import * as React from 'react'

import Control from './Control'
import { toggleFullScreen } from '../../System/Redux/SystemActions'
import { StatelessComponent } from '../../Utils'

export interface IProps {
    toggleFullScreen: Universis.Consumer<boolean>
    isFullScreen: boolean
    strings: Universis.Strings
}

/**
 * Component for toggle full screen.
 */
class FullScreenControl extends StatelessComponent<IProps> {

    public render(): React.ReactNode {
        const { toggleFullScreen, isFullScreen, strings } = this.props

        return (
            <Control
                isVisible={true}
                onClick={() => toggleFullScreen(!isFullScreen)}
                name={isFullScreen ? 'minimize' : 'maximalize'}
                label={isFullScreen ? strings.minimize : strings.maximize} />
        )
    }
}

export default FullScreenControl.connect(
    ({ system }: Universis.Redux.StoreState) => ({
        isFullScreen: system.isFullScreen,
        strings: system.strings.controls
    }),
    { toggleFullScreen }
)