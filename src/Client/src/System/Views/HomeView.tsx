import * as React from 'react'

import Home from '../Components/Home'
import { View } from '../../Utils'

interface IProps {

}

/**
 * View for home page.
 */
class HomeView extends View<IProps> {

    public render(): JSX.Element {
        return (
            <section className={this.getClassName('home')}>
                <Home />
            </section>
        )
    }

}

export default HomeView.connect()