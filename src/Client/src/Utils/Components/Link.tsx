import * as React from 'react'
import { NavLink } from 'react-router-dom'

import StatelessComponent from './StatelessComponent'
import Urls from '../Constants/Urls'

interface IProps {
    target: string,
    className?: string,
    onClick: IRunnable,
    style: { [property: string]: string | number }
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

    /**
     * If link has some callback, run it.
     * @param event Event.
     * @param callback Callback.
     */
    private handleClick = (event: React.MouseEvent<HTMLElement>, callback: IRunnable) => {
        event.preventDefault()
        callback()
    }

    public render(): JSX.Element {
        const { className, onClick, target, style } = this.props

        // TODO: Refactor.

        if (onClick) {
            return (
                <a
                    className={className}
                    onClick={event => this.handleClick(event, onClick)}
                    style={style}
                    href={target}>
                    {this.props.children}
                </a>
            )
        } else {
            return (
                <NavLink
                    activeClassName={className + '--active'}
                    className={className}
                    style={style}
                    exact
                    to={target}>
                    {this.props.children}
                </NavLink>
            )
        }
    }

}

export default Link.connect()