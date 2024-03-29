import * as React from 'react'
import { NavLink } from 'react-router-dom'

import StatelessComponent from './StatelessComponent'
import Urls from '../Constants/Urls'
import Url from '../Utils/Url'
import Queries from '../Constants/Queries'

interface IProps {
    target?: string
    query?: string | { [name: string]: string }
    className?: string
    onClick: Universis.Runnable
    style: { [property: string]: string | number }
}

/**
 * Component for router link.
 * If target is link is same as current url, there will be suffix --active in CSS class.
 */
class Link extends StatelessComponent<IProps> {

    /**
     * List of all urls.
     */
    public static URLS = Urls

    /**
     * List of all query params.
     */
    public static QUERIES = Queries

    private get search(): string {
        const { query, location } = this.props

        if (!query) {
            return location.search
        } else {
            if (typeof query === 'string') {
                const queryPairs = query.replace('?', '').split('&')
                let newQuery = location.search

                for (const queryParam of queryPairs) {
                    const queryPair = queryParam.split('=')

                    if (queryPair[0]) {
                        newQuery = Url.setQuery(queryPair[0], queryPair[1], newQuery)
                    } else {
                        newQuery = Url.removeQuery(queryPair[0], newQuery)
                    }
                }

                return newQuery
            } else {
                let newQuery = location.search

                for (const queryParam in query) {
                    if (query[queryParam]) {
                        newQuery = Url.setQuery(queryParam, query[queryParam], newQuery)
                    } else {
                        newQuery = Url.removeQuery(queryParam, newQuery)
                    }
                }

                return newQuery
            }
        }
    }

    public render(): React.ReactNode {
        const { className, target, style, query } = this.props

        return (
            <NavLink
                activeClassName={query ? null : className + '--active'}
                className={className}
                style={style}
                exact
                to={{ pathname: target, search: this.search }}>
                {this.props.children}
            </NavLink>
        )
    }

}

export default Link.connect()