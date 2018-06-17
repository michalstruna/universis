import * as ClassNames from 'classnames'
import * as React from 'react'

import Url from '../Utils/Url'
import StatelessComponent from './StatelessComponent'

interface IProps {
    className?: string
    isAlertVisible: boolean
    noHomePage?: boolean
    visibleAlert?: boolean
}

/**
 * Layout for blur content.
 */
class BlurLayout extends StatelessComponent<IProps> {

    /**
     * Check if layout is blurred.
     * @return Layout is blurred.
     */
    private get isBlurred(): boolean {
        const { isAlertVisible, noHomePage, visibleAlert } = this.props

        let isBlurred = false

        if (noHomePage && !Url.isMainPage(this.props.location.pathname)) {
            isBlurred = true
        }

        if (visibleAlert && isAlertVisible) {
            isBlurred = true
        }

        return isBlurred
    }

    public render(): JSX.Element {
        const className = ClassNames(
            'blur-layout',
            { 'blur-layout--blurred': this.isBlurred },
            this.props.className
        )

        return (
            <section className={className}>
                {this.props.children}
            </section>
        )
    }

}

export default BlurLayout.connect(
    ({ system }: any) => ({
        isAlertVisible: system.alert.isVisible
    })
)