import * as React from 'react'

import SimpleComponent from './SimpleComponent'

/**
 * Base view for all another views.
 */
abstract class View extends SimpleComponent {

    /**
     * Render content of view.
     * @return Content of view.
     */
    public abstract render(): JSX.Element

    /**
     * Concat class name of view.
     * @return CSS class of view.
     */
    protected getClassName(name: string): string {
        return 'view ' + name
    }

}

export default View