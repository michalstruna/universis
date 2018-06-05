import * as React from 'react'

import SimpleComponent from './SimpleComponent'
import Titles from '../Constants/Titles'
import Strings from '../../../../Utils/Strings'

/**
 * Base view for all another views.
 */
abstract class View extends SimpleComponent {

    /**
     * Set document title.
     */
    public componentDidMount(): void {
        const viewName = this.constructor.name.replace(/View$/, '')
        const titleName = Strings.camelToUpper(viewName)
        document.title = 'Universis | ' + Titles[titleName]
    }

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