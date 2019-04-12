import * as React from 'react'

import StatelessComponent from './StatelessComponent'
import { EditorControl } from '../index'

interface IProps {
    onEdit: Universis.Runnable
    onDelete: Universis.Runnable
}

/**
 * Control for editing, adding or deleting content.
 */
class DetailEditor extends StatelessComponent<IProps> {

    public render(): React.ReactNode {
        const { onDelete, onEdit } = this.props

        return (
            <section className='editor'>
                <EditorControl
                    type={EditorControl.UPDATE}
                    onClick={onEdit} />
                <EditorControl
                    type={EditorControl.DELETE}
                    onClick={onDelete} />
            </section>
        )
    }

}

export default DetailEditor