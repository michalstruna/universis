import * as ClassNames from 'classnames'
import * as React from 'react'

import Url, { Urls } from '../Utils/Url'
import StatelessComponent from './StatelessComponent'

interface IProps {
    className?: string
    noHomePage?: boolean
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
        const { noHomePage, location } = this.props

        let isBlurred = false

        if (noHomePage && !Url.equalsPage(Url.getPage(location.pathname), Urls.HOME)) {
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

export default BlurLayout.connect()