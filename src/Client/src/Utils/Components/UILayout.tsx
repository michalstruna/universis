import * as React from 'react'

import FadeLayout from './FadeLayout'
import StatelessComponent from './StatelessComponent'

interface IProps {
    children: JSX.Element | JSX.Element[] | string | number,
    isUIVisible: boolean
}

/**
 * Component for animated loader.
 */
class UILayout extends StatelessComponent<IProps> {

    public render(): JSX.Element {
        const { children, isUIVisible, ...props } = this.props

        return (
            <FadeLayout mounted={isUIVisible} {...props}>
                {children}
            </FadeLayout>
        )
    }

}

export default UILayout.connect(
    ({ system }: IStoreState) => ({
        isUIVisible: system.isUIVisible
    })
)