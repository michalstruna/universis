import * as ClassNames from 'classnames'
import * as React from 'react'

import { AsyncEntity, Units, View, DataTable } from '../../Utils'
import { getApprovals, approve, disapprove } from '../Redux/ApprovalsActions'
import { SubjectType } from '../../../../Constants'
import { Message } from '../../Panel'

interface IProps {
    approvals: Universis.Redux.AsyncEntity<Universis.Approval[]>
    getApprovals: Universis.Runnable
    approve: Universis.Consumer<string>
    disapprove: Universis.Consumer<string>
}

/**
 * View for unapproved items.
 */
class ApprovalsView extends View<IProps> {

    public componentDidMount(): void {
        const { approvals, getApprovals } = this.props
        AsyncEntity.request(approvals, getApprovals)
    }

    private renderItem(approval: Universis.Approval, isAfter: boolean): React.ReactNode {
        const data = isAfter ? approval.after : approval.before

        if (!data) {
            return null
        }

        switch (approval.notification.subjectType) {
            case SubjectType.EVENT:
                const formatter = value => value < 0 ? Units.toShort(value) : Units.toFull(value)
                const toAfter = this.getValue(approval.after, ['to'])
                const toBefore = this.getValue(approval.before, ['to'])
                const fromAfter = this.getValue(approval.after, ['from'])
                const fromBefore = this.getValue(approval.before, ['from'])

                if (approval.after && toAfter == fromAfter) {
                    delete approval.after.to
                }

                if (approval.before && toBefore == fromBefore) {
                    delete approval.before.to
                }

                return (
                    <section className='approvals__item'>
                        <section className='events-area__event__detail'>
                            <div>
                                {
                                    !data.to || data.from === data.to ?
                                        this.renderDiffValue(approval, ['from'], isAfter, formatter) :
                                        <>
                                            {this.renderDiffValue(approval, ['from'], isAfter, formatter)} až {this.renderDiffValue(approval, ['to'], isAfter, formatter)}
                                        </>
                                }
                            </div>
                            <h3>
                                {this.renderDiffValue(approval, ['title'], isAfter)}
                            </h3>
                            <p>
                                {this.renderDiffValue(approval, ['description'], isAfter)}
                            </p>
                        </section>
                    </section>
                )

            case SubjectType.BODY_TYPE:
                const texture = data.texture ? (
                    <>
                        <img src={`/Images/Universe/Textures/${data.texture}`} />
                        <section className='approvals__block--right'>
                            {this.renderDiffValue(approval, ['texture'], isAfter)}
                        </section>
                    </>
                ) : null

                const info = {}

                if (data.emissiveColor) {
                    info['Světlo'] = this.renderDiffValue(approval, ['emissiveColor'], isAfter)
                }

                if (data.particlesGenerator) {
                    info['Částice'] = () => (
                        <code className='approvals__code'>
                            {this.renderDiffValue(approval, ['particlesGenerator'], isAfter)}
                        </code>
                    )
                }

                return (
                    <section className='approvals__block'>
                        <h3>
                            {this.renderDiffValue(approval, ['name'], isAfter)}
                        </h3>
                        {texture}
                        <DataTable data={info} />
                    </section>
                )
        }
    }

    /**
     * Render value with color (add, change, delete).
     * @param approval
     * @param keys
     * @param isAfter
     * @param formatter
     * @returns Styled value.
     */
    private renderDiffValue(approval: Universis.Approval, keys: string[], isAfter: boolean, formatter: Universis.Function<any, any> = value => value): React.ReactNode {
        const after = this.getValue(approval.after, keys)
        const before = this.getValue(approval.before, keys)

        return (
            <span className={ClassNames(
                { 'approvals__value--deleted': before && !after },
                { 'approvals__value--added': !before && after },
                { 'approvals__value--changed': after && before && before != after }
            )}>
                {isAfter ? formatter(after) : formatter(before)}
            </span>
        )
    }

    /**
     * Get nested data or null.
     * @param data
     * @param keys
     * @returns Value or null.
     */
    private getValue(data: any, keys: string[]): any {
        try {
            let current = data

            for (const key of keys) {
                current = current[key]
            }

            return current
        } catch {
            return null
        }
    }

    private renderApprovals(): React.ReactNode {
        const { approvals, approve, disapprove } = this.props

        return approvals.payload.map((approval, key) => {
            return (
                <section className='approvals__approval' key={key}>
                    <Message data={approval.notification} />
                    <section className='approvals__approval--inner'>
                        <section className='approvals__approval--left'>
                            {this.renderItem(approval, false)}
                        </section>
                        <section
                            className={'approvals__approval__relation approvals__approval__relation--' + approval.notification.operation} />
                        <section className='approvals__approval--right'>
                            {this.renderItem(approval, true)}
                        </section>
                    </section>
                    <p className='approvals__approval__tools'>
                        <button
                            className='approvals__approval--approve'
                            onClick={() => {
                                if (confirm('Opravdu schválit?')) {
                                    approve(approval._id)
                                }
                            }} />
                        <button
                            className='approvals__approval--disapprove'
                            onClick={() => {
                                if (confirm('Opravdu zamítnout?')) {
                                    disapprove(approval._id)
                                }
                            }} />
                    </p>
                </section>
            )
        })
    }

    public render(): React.ReactNode {
        const { approvals } = this.props

        return (
            <section className={this.getClassName('approvals', true)}>
                <AsyncEntity data={approvals} success={() => (
                    <>
                        <h1 className='approvals__title'>
                            Čeká na schválení ({approvals.payload.length})
                        </h1>
                        {this.renderApprovals()}
                    </>
                )} />
            </section>
        )
    }

}

export default ApprovalsView.connect(
    ({ approval }: Universis.Redux.StoreState) => ({
        approvals: approval.approvals
    }),
    { getApprovals, approve, disapprove }
)