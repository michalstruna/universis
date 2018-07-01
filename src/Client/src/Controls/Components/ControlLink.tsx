import * as React from 'react'

import { StatelessComponent, Url } from '../../Utils'
import Control from './Control'

export interface IProps {
    label: string,
    name: string,
    target: string,
    isVisible?: ISupplier<boolean>
}

abstract class ControlLink extends StatelessComponent<IProps> {

    /**
     * After click, go to the target page.
     * @param event
     */
    private handleClick = (event: React.MouseEvent<HTMLElement>): void => {
        this.props.history.push(this.props.target)
    }

    public render(): JSX.Element {
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