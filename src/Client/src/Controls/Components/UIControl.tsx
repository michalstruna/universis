import * as React from 'react'

import Control from './Control'
import { SystemActions } from '../../System'
import { StatelessComponent } from '../../Utils'


export interface IProps {
    isUIVisible: boolean,
    strings: IStrings,
    toggleUI: IConsumer<boolean>
}

/**
 * Component for toggle UI.
 */
class UIControl extends StatelessComponent<IProps> {

    public render(): JSX.Element {
        const { isUIVisible, strings, toggleUI } = this.props

        return (
            <Control
                isVisible={true}
                onClick={() => toggleUI(!isUIVisible)}
                name={isUIVisible ? 'hide-ui' : 'show-ui'}
                label={isUIVisible ? strings.hideUI : strings.showUI} />
        )
    }
}

export default UIControl.connect(({ system }: IStoreState) => ({
    isUIVisible: system.isUIVisible,
    strings: system.strings.controls
}), (dispatch: IDispatch) => ({
    toggleUI: isUIVisible => dispatch(SystemActions.toggleUI(isUIVisible)),
}))