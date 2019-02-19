import * as React from 'react'

import StatelessComponent from './StatelessComponent'

interface IProps {
    type: string
    onClick: Universis.Runnable
    strings: IStrings
}

/**
 * Control for editing, adding or deleting content.
 */
class EditorControl extends StatelessComponent<IProps> {

    /**
     * Add type of control.
     */
    public static ADD = 'ADD'

    /**
     * Delete type of control.
     */
    public static DELETE = 'DELETE'

    /**
     * Update type of control.
     */
    public static UPDATE = 'UPDATE'

    public render(): React.ReactNode {
        const { type, strings, onClick } = this.props

        return (
            <button
                className={'editor__control editor__control--' + type.toLowerCase()}
                onClick={onClick}>
                {strings[type.toLowerCase()]}
            </button>
        )
    }

}

export default EditorControl.connect(
    ({ system }: IStoreState) => ({
        strings: system.strings.editor
    })
)