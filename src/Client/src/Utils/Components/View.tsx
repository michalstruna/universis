import * as React from 'react'

import StatelessComponent from './StatelessComponent'
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
     * @param name
     * @param small
     * @return CSS class of view.
     */
    protected getClassName(name: string, small?: boolean): string {
        return 'view ' + name + (small ? ' view--small' : '')
    }

}

export default View