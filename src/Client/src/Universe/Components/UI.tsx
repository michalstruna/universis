import * as React from 'react'

import ControlBar from './ControlBar'
import ControlPanel from './ControlPanel'
import { StatelessComponent, UILayout } from '../../Utils'

interface IProps {

}

/**
 * UI for universe.
 */
class UI extends StatelessComponent<IProps> {

    public render(): JSX.Element {
        return (
            <UILayout>
                <section className='universe__ui'>
                    <section className='universe__ui--inner'>
                        <ControlBar />
                        <ControlPanel />
                    </section>
                </section>
            </UILayout>
        )
    }

}

export default UI