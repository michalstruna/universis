import * as React from 'react'

import Control from './Control'
import { toggleUI } from '../../System'
import { StatelessComponent } from '../../Utils'


export interface IProps {
    isUIVisible: boolean,
    strings: Universis.Strings,
    toggleUI: Universis.Consumer<boolean>
}

/**
 * Component for toggle UI.
 */
class UIControl extends StatelessComponent<IProps> {

    public render(): React.ReactNode {
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

export default UIControl.connect((
    { system }: Universis.Redux.StoreState) => ({
        isUIVisible: system.isUIVisible,
        strings: system.strings.controls
    }),
    { toggleUI }
)