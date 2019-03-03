import * as React from 'react'

import { Link, StatelessComponent } from '../../Utils'

interface IProps {
    links: Universis.Map<string>
    className?: string
}

/**
 * Component that render list of links.
 */
class Menu extends StatelessComponent<IProps> {

    public static defaultProps = {
        className: 'menu'
    }

    /**
     * Render links.
     * @returns List of links.
     */
    private renderLinks(): React.ReactNode {
        const { links, className } = this.props

        return Object.keys(links).map((i, key) => (
            <Link
                className={className + '__link'}
                key={key}
                target={links[i]}>
                {i}
            </Link>
        ))
    }

    public render(): React.ReactNode {
        return (
            <section className={this.props.className}>
                {this.renderLinks()}
            </section>
        )
    }

}

export default Menu