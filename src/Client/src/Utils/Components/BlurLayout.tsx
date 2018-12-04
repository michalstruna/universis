import * as ClassNames from 'classnames'
import * as React from 'react'

import Url, { Urls } from '../Utils/Url'
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
        const { isAlertVisible, noHomePage, visibleAlert, location } = this.props

        let isBlurred = false

        if (noHomePage && !Url.equalsPage(Url.getPage(location.pathname), Urls.HOME)) {
            isBlurred = true
        }

        if (visibleAlert && isAlertVisible) {
            isBlurred = true
        }

        return isBlurred
    }

    public render(): React.ReactNode {
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
    ({ system }: IStoreState) => ({
        isAlertVisible: system.alert.isVisible
    })
)