import * as React from 'react'

import Control from './Control'
import { SystemActions } from '../../System'
import { StatelessComponent } from '../../Utils'


export interface IProps {
    toggleFullScreen: IConsumer<boolean>
    isFullScreen: boolean
    strings: IStrings
}

/**
 * Component for toggle full screen.
 */
class FullScreenControl extends StatelessComponent<IProps> {

    public render(): JSX.Element {
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

export default FullScreenControl.connect(({ system }: IStoreState) => ({
    isFullScreen: system.isFullScreen,
    strings: system.strings.controls
}), (dispatch: IDispatch) => ({
    toggleFullScreen: (isFullScreen: boolean) => dispatch(SystemActions.toggleFullScreen(isFullScreen))
}))