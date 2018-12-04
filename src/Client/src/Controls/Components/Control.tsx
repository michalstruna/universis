import * as React from 'react'

import { StatelessComponent } from '../../Utils'

export interface IProps {
    name: string
    label: string
    isVisible: boolean
    onClick: IConsumer<React.MouseEvent<HTMLElement>>
}

/**
 * Component for rendering nested controls.
 */
abstract class Control extends StatelessComponent<IProps> {

    /**
     * After click, call callback.
     * @param event
     */
    private handleClick = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault()
        this.props.onClick(event)
    }

    public render(): React.ReactNode {
        if (!this.props.isVisible) {
            return null
        }

        const { name, label } = this.props

        return (
            <section
                className={'control control--' + name}
                onClick={this.handleClick}>
                <section className='control--inner'>
                    {label}
                </section>
            </section>
        )
    }

}

export default Control.connect()