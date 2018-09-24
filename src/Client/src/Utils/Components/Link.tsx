import * as React from 'react'
import { NavLink } from 'react-router-dom'

import StatelessComponent from './StatelessComponent'
import Urls from '../Constants/Urls'
import Url from '../Utils/Url'
import Queries from '../Constants/Queries'

interface IProps {
    target?: string
    query?: { [name: string]: string }
    className?: string
    onClick: IRunnable
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
            let newQuery = location.search

            for (const queryParam in query) {
                if(query[queryParam]) {
                    newQuery = Url.setQuery(newQuery, queryParam, query[queryParam])
                } else {
                    newQuery = Url.removeQuery(newQuery, queryParam)
                }
            }

            return newQuery
        }
    }

    public render(): JSX.Element {
        const { className, target, style } = this.props

        return (
            <NavLink
                activeClassName={className + '--active'}
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