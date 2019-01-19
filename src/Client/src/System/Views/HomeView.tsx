import * as React from 'react'

import { Urls, View, Menu } from '../../Utils'

interface IProps {
    strings: IStrings
}

/**
 * View for home page.
 */
class HomeView extends View<IProps> {

    public render(): React.ReactNode {
        const { strings } = this.props

        return (
            <section className={this.getClassName('home')}>
                <section className='home__center'>
                    <h1 className='home__title'>
                        {this.props.strings.title}
                    </h1>
                    <Menu
                        className='home__menu'
                        links={{
                            [strings.menu.universe]: Urls.UNIVERSE,
                            [strings.menu.login]: Urls.IDENTITY
                        }} />
                </section>
            </section>
        )
    }

}

export default HomeView.connect(
    ({ system }: IStoreState) => ({
        strings: system.strings.home
    })
)