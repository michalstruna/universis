import * as ClassNames from 'classnames'
import * as React from 'react'

import StatelessComponent from './StatelessComponent'

interface IAreaProps {
    isExpanded: boolean
    expandedHeight?: number | string
    className?: string
}

/**
 * Dropdown area with animated height.
 */
class DropdownArea extends StatelessComponent<IAreaProps> {

    public render(): React.ReactNode {
        const { isExpanded, children, expandedHeight, className } = this.props

        return (
            <section
                className={ClassNames('dropdown__area', { 'dropdown__area--expanded': isExpanded }, className, { [className + '--expanded']: className && isExpanded })}
                style={expandedHeight && isExpanded ? { height: expandedHeight } : undefined}>
                <section className='dropdown__area--inner'>
                    {children}
                </section>
            </section>
        )
    }

}

interface IButtonProps {
    isExpanded: boolean
    label: string
    onClick: Universis.Runnable
}

/**
 * Dropdown button with animated arrow icon.
 */
class DropdownButton extends StatelessComponent<IButtonProps> {

    public render(): React.ReactNode {
        const { isExpanded, label, onClick } = this.props

        return (
            <button
                className={ClassNames('dropdown__button', { 'dropdown__button--expanded': isExpanded })}
                onClick={onClick}>
                {label}
            </button>
        )
    }

}

export {
    DropdownArea,
    DropdownButton
}