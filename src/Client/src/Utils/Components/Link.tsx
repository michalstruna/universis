import * as React from 'react'
import { NavLink } from 'react-router-dom'

import StatelessComponent from './StatelessComponent'
import Urls from '../Constants/Urls'

interface IProps {
    target: string,
    className?: string
}

/**
 * Component for router link.
 * If target is link is same as current url, there will be suffix --active in CSS class.
 */
class Link extends StatelessComponent<IProps> {

    /**
     * @var URLS List of all local urls.
     */
    public static URLS = Urls

    public render(): JSX.Element {
        const { className, target } = this.props

        return (
            <NavLink
                activeClassName={className + '--active'}
                className={className}
                exact
                to={target}>
                {this.props.children}
            </NavLink>
        )
    }

}

export default Link.connect()