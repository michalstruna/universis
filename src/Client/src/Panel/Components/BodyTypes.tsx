import * as React from 'react'

import {
    AsyncEntity,
    DetailEditor,
    EditorControl,
    FadeLayout,
    StatelessComponent,
    Table
} from '../../Utils'

import { toggleBodyTypeForm } from '../Redux/PanelActions'
import { deleteBodyType } from '../../Universe'
import BodyTypeForm from './BodyTypeForm'

interface IProps {
    bodyTypes: Universis.Redux.AsyncEntity<Universis.Universe.Body.Type[]>
    toggleBodyTypeForm: (isVisible: boolean, type?: Universis.Universe.Body.Type) => void
    deleteBodyType: Universis.Consumer<boolean>
    strings: Universis.Strings
    isFormVisible: boolean
}

class Bodies extends StatelessComponent<IProps> {


    private getColumns(): IColumn<Universis.Universe.Body.Type>[] {
        const { strings, toggleBodyTypeForm, deleteBodyType } = this.props

        return [
            {
                accessor: bodyType => bodyType.name,
                title: strings.name
            },
            {
                accessor: bodyType => bodyType.emissiveColor,
                title: strings.emissiveColor
            },
            {
                accessor: bodyType => bodyType.visible === false ? 'Virtuální' : (bodyType.particlesGenerator ? 'Částice' : 'Klasický'),
                title: strings.type
            },
            {
                accessor: bodyType => bodyType._id,
                title: '',
                render: (bodyTypeId, bodyType) => <DetailEditor
                    onEdit={() => toggleBodyTypeForm(true, bodyType)}
                    onDelete={() => {
                        if (confirm(`Opravdu smazat ${bodyType.name}?`)) {
                            deleteBodyType(bodyTypeId)
                        }
                    }} />
            }
        ]
    }

    /**
     * Render list of body types.
     * @returns Database.
     */
    private renderTable(): React.ReactNode {
        const { bodyTypes } = this.props

        return (
            <AsyncEntity
                data={bodyTypes}
                success={() => (
                    <section className='panel__body-types__table'>
                        <Table
                            columns={this.getColumns()}
                            items={bodyTypes.payload} />
                    </section>
                )} />
        )
    }

    /**
     * Render add button.
     */
    private renderAdd(): React.ReactNode {
        const { isFormVisible, toggleBodyTypeForm } = this.props

        return (
            <>
                <FadeLayout
                    mounted={isFormVisible}
                    className='panel__body__form'
                    type={FadeLayout.SCALE}>
                    <BodyTypeForm />
                </FadeLayout>
                <EditorControl
                    type={EditorControl.ADD}
                    onClick={() => toggleBodyTypeForm(true)}>
                </EditorControl>
            </>
        )
    }

    public render(): React.ReactNode {
        return (
            <section className='panel__body-types panel__window'>
                <section className='panel__body-types--inner'>
                    {this.renderTable()}
                </section>
                {this.renderAdd()}
            </section>
        )
    }

}

export default Bodies.connect(
    ({ system, panel, universe }: Universis.Redux.StoreState) => ({
        bodyTypes: universe.bodyTypes,
        strings: system.strings.database,
        isFormVisible: panel.isBodyTypeFormVisible
    }),
    { toggleBodyTypeForm, deleteBodyType }
)