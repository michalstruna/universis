import * as ClassNames from 'classnames'
import * as React from 'react'

import { StatelessComponent, Loader, Link } from '../../Utils'

interface IFormData {
    [name: string]: any
}

interface IProps {
    onSubmit: Universis.Consumer<IFormData>
    invalid: boolean
    sending: boolean
}

/**
 * Component for rendering form.
 */
class Form extends StatelessComponent<IProps> {

    /**
     * Render row with flexbox layout.
     * @param children
     * @constructor
     */
    public static FlexRow = ({ children }): React.ReactNode => (
        <section className='form__flex-row'>
            {children}
        </section>
    )

    /**
     * Render form title.
     * @param children
     * @constructor
     */
    public static Title = ({ children }): React.ReactNode => (
        <legend className='form__title'>
            {children}
        </legend>
    )

    /**
     * Render form note.
     * @param children
     * @constructor
     */
    public static Note = ({ children }): React.ReactNode => (
        <section className='form__note'>
            {children}
        </section>
    )

    /**
     * Render back button.
     * @param to
     * @param children
     * @param onClick
     * @constructor
     */
    public static Back = ({ to, children, onClick }): React.ReactNode => {
        if (onClick) {
            return (
                <button
                    className='form__button form__button--back'
                    onClick={event => {
                        event.stopPropagation()
                        event.preventDefault()
                        onClick()
                    }}>
                    {children}
                </button>
            )
        } else if (to) {
            return (
                <Link
                    className='form__button form__button--back'
                    target={to}>
                    {children}
                </Link>
            )
        }
    }

    /**
     * Render close button.
     * @param onClick
     * @constructor
     */
    public static Close = ({ onClick }): React.ReactNode => (
        <button
            className='form__button form__button--close'
            onClick={event => {
                event.stopPropagation()
                event.preventDefault()
                onClick()
            }} />
    )

    /**
     * Render submit button.
     * @param children
     * @constructor
     */
    public static Submit = ({ children }): React.ReactNode => (
        <button
            className='form__button form__button--submit'
            type='submit'>
            <section className='form__button__text'>
                {children}
            </section>
            <section className='form__button__icon' />
        </button>
    )

    public render(): React.ReactNode {
        const { children, onSubmit, invalid, sending } = this.props

        return (
            <form
                className={ClassNames('form', { 'form--invalid': invalid }, { 'form--sending': sending })}
                onSubmit={onSubmit}
                noValidate>
                {children}
                <Loader />
            </form>
        )
    }

}

export default Form.connect()