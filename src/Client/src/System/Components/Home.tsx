import * as React from 'react'

import Menu from '../Components/Menu'
import { StatelessComponent } from '../../Utils'

interface IProps {
    strings: {
        title: string
    }
}

/**
 * Components for rendering intro.
 */
class Home extends StatelessComponent<IProps> {

    public render(): JSX.Element {
        return (
            <section className='home__center'>
                <h1 className='home__title'>
                    {this.props.strings.title}
                </h1>
                <Menu />
            </section>
        )
    }

}

export default Home.connect(
    ({ system }: IStoreState) => ({
        strings: system.strings.home
    })
)