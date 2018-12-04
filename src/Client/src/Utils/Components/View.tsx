import * as React from 'react'

import StatelessComponent from './StatelessComponent'
import Titles from '../Constants/Titles'
import Strings from '../../../../Utils/Strings'

/**
 * Base view for all another views.
 */
abstract class View<IProps> extends StatelessComponent<IProps> {

    /**
     * Set document title.
     */
    public componentDidMount(): void {
        const viewName = this.constructor.name.replace(/View$/, '')
        const titleName = Strings.camelToUpper(viewName)
        //document.title = 'Universis | ' + Titles[titleName] // TODO: Fix in prod.
        document.title = 'Universis'
    }

    /**
     * Render content of view.
     * @return Content of view.
     */
    public abstract render(): React.ReactNode

    /**
     * Concat class name of view.
     * @return CSS class of view.
     */
    protected getClassName(name: string): string {
        return 'view ' + name
    }

}

export default View