import * as React from 'react'

import Control from './Control'
import { SystemActions } from '../../System'
import { StatelessComponent } from '../../Utils'


export interface IProps {
    exitFullScreen: IRunnable,
    isFullScreen: boolean,
    openFullScreen: IRunnable,
    strings: IStrings
}

/**
 * Component for toggle full screen.
 */
class FullScreenControl extends StatelessComponent<IProps> {

    /**
     * After click, toggle full screen.
     */
    private handleClick = (event: React.MouseEvent<HTMLElement>): void => {
        if (this.props.isFullScreen) {
            this.props.exitFullScreen()
        } else {
            this.props.openFullScreen()
        }
    }

    public render(): JSX.Element {
        return (
            <Control
                isVisible={true}
                onClick={this.handleClick}
                name={this.props.isFullScreen ? 'minimize' : 'maximalize'}
                label={this.props.isFullScreen ? this.props.strings.minimize : this.props.strings.maximize} />
        )
    }
}

export default FullScreenControl.connect(({ system }: IStoreState) => ({
    isFullScreen: system.isFullScreen,
    strings: system.strings.controls
}), (dispatch: IDispatch) => ({
    exitFullScreen: () => dispatch(SystemActions.exitFullScreen()),
    openFullScreen: () => dispatch(SystemActions.openFullScreen())
}))