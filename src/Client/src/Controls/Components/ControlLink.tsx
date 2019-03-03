import * as React from 'react'

import { StatelessComponent, Url } from '../../Utils'
import Control from './Control'

export interface IProps {
    label: string,
    name: string,
    target: string,
    isVisible?: Universis.Supplier<boolean>
}

abstract class ControlLink extends StatelessComponent<IProps> {

    /**
     * After click, go to the target page.
     * @param event
     */
    private handleClick = (event: React.MouseEvent<HTMLElement>): void => {
        const { history, target, location } = this.props
        history.push(target + location.search)
    }

    public render(): React.ReactNode {
        const { isVisible, label, location, name, target } = this.props

        return (
            <Control
                isVisible={isVisible ? isVisible() : !Url.equalsPage(target, location.pathname)}
                onClick={this.handleClick}
                name={name}
                label={label} />
        )
    }

}

export default ControlLink.connect()