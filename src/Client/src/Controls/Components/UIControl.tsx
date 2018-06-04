import * as React from 'react'

import Control from './Control'
import { SystemActions } from '../../System'
import { StatelessComponent } from '../../Utils'


export interface IProps {
    hideUI: () => void,
    isUIVisible: boolean,
    showUI: () => void,
    strings: {
        hideUI: string,
        showUI: string
    }
}

/**
 * Component for toggle UI.
 */
class UIControl extends StatelessComponent<IProps> {

    /**
     * After click, toggle UI.
     */
    private handleClick = (event: React.MouseEvent<HTMLElement>): void => {
        if (this.props.isUIVisible) {
            this.props.hideUI()
        } else {
            this.props.showUI()
        }
    }

    public render(): JSX.Element {
        const { isUIVisible, strings } = this.props

        return (
            <Control
                isVisible={true}
                onClick={this.handleClick}
                name={isUIVisible ? 'hide-ui' : 'show-ui'}
                label={isUIVisible ? strings.hideUI : strings.showUI} />
        )
    }
}

export default UIControl.connect(({ system }: any) => ({
    isUIVisible: system.isUIVisible,
    strings: system.strings.controls
}), (dispatch: any) => ({
    showUI: () => dispatch(SystemActions.showUI()),
    hideUI: () => dispatch(SystemActions.hideUI())
}))