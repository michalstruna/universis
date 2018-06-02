import * as React from 'react'

import { Link, StatelessComponent } from '../../Utils'

interface IProps {
    strings: {
        title: string,
        menu: [{
            label: string,
            target: string
        }]
    }
}

/**
 * Component for rendering intro.
 */
class Menu extends StatelessComponent<IProps> {

    /**
     * Render all links in menu.
     * @return Links.
     */
    private renderLinks(): JSX.Element[] {
        return this.props.strings.menu.map((link, key) => (
            <Link
                className='home__link'
                key={key}
                target={link.target}>
                {link.label}
            </Link>
        ))
    }

    public render(): JSX.Element {
        return (
            <section className='home__menu'>
                {this.renderLinks()}
            </section>
        )
    }

}

export default Menu.connect(
    ({ system }: any) => ({
        strings: system.strings.home
    })
)