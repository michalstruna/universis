import * as React from 'react'

import { Link, StatelessComponent, Urls } from '../../Utils'

interface IProps {
    strings: {
        title: string,
        menu: {
            universe: string,
            login: string
        }
    }
}

/**
 * Component for rendering intro.
 */
class Menu extends StatelessComponent<IProps> {

    /**
     * Render link in menu.
     * @param target Target of link.
     * @param label Label of link.
     * @return Link.
     */
    private renderLink(target: string, label: string): JSX.Element {
        return  (
            <Link
                className='home__link'
                target={target}>
                {label}
            </Link>
        )
    }

    public render(): JSX.Element {
        const { menu } = this.props.strings

        return (
            <section className='home__menu'>
                {this.renderLink(Urls.UNIVERSE, menu.universe)}
                {this.renderLink(Urls.IDENTITY, menu.login)}
            </section>
        )
    }

}

export default Menu.connect(
    ({ system }: IStoreState) => ({
        strings: system.strings.home
    })
)