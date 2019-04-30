import * as React from 'react'

import { Urls, View, Menu } from '../../Utils'

interface IProps {
    strings: Universis.Strings
    identity: Universis.Redux.AsyncEntity<Universis.User.Identity>
}

/**
 * View for home page.
 */
class HomeView extends View<IProps> {

    /**
     * Get menu links.
     */
    private getLinks(): Universis.Map<string> {
        const { identity, strings } = this.props

        const links: any = { [strings.menu.universe]: Urls.UNIVERSE }

        if (identity.payload) {
            links[strings.menu.profile] = Urls.USER + '/' + identity.payload._id
        } else {
            links[strings.menu.login] = Urls.IDENTITY
        }

        return links
    }

    public render(): React.ReactNode {
        const { strings } = this.props

        return (
            <section className={this.getClassName('home')}>
                <section className='home__center'>
                    <h1 className='home__title'>
                        {strings.title}
                    </h1>
                    <Menu
                        className='home__menu'
                        links={this.getLinks()} />
                </section>
            </section>
        )
    }

}

export default HomeView.connect(
    ({ system, user }: Universis.Redux.StoreState) => ({
        strings: system.strings.home,
        identity: user.identity
    })
)