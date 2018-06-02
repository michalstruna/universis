import * as React from 'react'

import { Home } from '../'
import { View } from '../../Utils'

interface IProps {

}

/**
 * View for home page.
 * There is only menu.
 */
class HomeView extends View<IProps> {

    public render(): JSX.Element {
        return (
            <section>
                <Home />
            </section>
        )
    }

}

export default HomeView