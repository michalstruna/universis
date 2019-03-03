import * as ClassNames from 'classnames'
import * as React from 'react'

import StatelessComponent from './StatelessComponent'
import Link from './Link'
import Url from '../Utils/Url'

interface IProps {
    links: Universis.Map<string>
    query: string
    className?: string
}

/**
 * Menu with query links.
 * Current link has '--active' className suffix.
 */
class QueryMenu extends StatelessComponent<IProps> {

    public static defaultProps = {
        className: 'query-menu',
        linkClassName: 'query-menu__link'
    }

    private renderLinks(): React.ReactNode {
        const { links, query, className, location } = this.props
        const currentQuery = Url.getQuery(query, location.search)

        return Object.keys(links).map((i, key) => (
            <Link
                key={key}
                query={{ [query]: links[i] }}
                className={ClassNames(className + '__link', { [className + '__link--active']: currentQuery === links[i] })}>
                {i}
            </Link>
        ))
    }

    public render(): React.ReactNode {
        const { className } = this.props

        return (
            <section className={className}>
                {this.renderLinks()}
            </section>
        )
    }

}

export default QueryMenu.connect()