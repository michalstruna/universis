import * as ClassNames from 'classnames'
import * as React from 'react'

import { StatelessComponent, Units, EventArea, EditorControl, DetailEditor } from '../../Utils'
import { LineChart } from '../../Charts'
import EventForm from './EventForm'
import { toggleBodyEventForm } from '../Redux/PanelActions'
import { deleteEvent } from '../../Universe'

interface IProps {
    strings: Universis.Strings
    body: Universis.Redux.AsyncEntity<Universis.Universe.Body>
    isFormVisible: boolean
    toggleBodyEventForm: (isVisible: boolean, event?: Universis.Event) => void
    deleteEvent: Universis.Consumer<string>
}

const generateYears = (): number[] => {
    const plus = [0, 1900, new Date().getFullYear()]
    const minus = [-10000]

    for (let i = 0; i < 4; i++) {
        minus.push(minus[minus.length - 1] * 10)
    }

    minus.push(-2.5e8, -5e8, -1e9)

    for (let i = 0; i < 5; i++) {
        minus.push(minus[minus.length - 1] - 1e9)
    }

    minus.push(-8e9, -13.8e9)

    plus.reverse()
    return plus.concat(minus)
}

const YEARS = generateYears()
const CHART_YEARS = [0, -1e4, -1e5, -1e6, -1e7, -1e8, -1e9, -14e9]

class BodyTimeline extends StatelessComponent<IProps> {

    /**
     * Because of large values and small amount of pixels.
     * @param value
     */
    private obfuscateValue = (value: number) => {
        return value < 0 ? (value + (value / 1e3) * Math.sin(value)) : value
    }

    /**
     * Get count of events in time interval.
     * @param from Start.
     * @param to End.
     * @returns Count of events.
     */
    private getEventsCount(from: number, to: number): number {
        const { events } = this.props.body.payload
        return events.filter(event => (
            (event.from < from && event.to > from) ||
            (event.from < to && event.to > to) ||
            (event.from > from && event.to < to)
        )).length
    }

    /**
     * Render add button.
     */
    private renderAdd(): React.ReactNode {
        const { isFormVisible, toggleBodyEventForm } = this.props

        return (
            <>
                <section
                    className={ClassNames('panel__body__timeline__form', { 'panel__body__timeline__form--visible': isFormVisible })}>
                    <EventForm />
                </section>
                <EditorControl
                    type={EditorControl.ADD}
                    onClick={() => toggleBodyEventForm(true)}>
                </EditorControl>
            </>
        )
    }

    public render(): React.ReactNode {
        const { body, toggleBodyEventForm, deleteEvent } = this.props

        if (!body.payload) {
            return null
        }

        return (
            <section className='panel__body__timeline'>
                <section className='panel__body__timeline__preview'>
                    <section className='panel__body__timeline__preview--left'>
                        <LineChart
                            labels={CHART_YEARS.map(value => Units.toShort(value))}
                            values={CHART_YEARS.map((value, key) => this.getEventsCount(value, key ? CHART_YEARS[key - 1] : new Date().getFullYear()))}
                            height={55}
                            width={320} />
                    </section>
                </section>
                <EventArea
                    columnsCount={5}
                    events={body.payload.events}
                    formatCurrentValue={value => Units.toFull(this.obfuscateValue(value))}
                    formatTickValue={Units.toShort}
                    formatDetailValue={value => value < 0 ? Units.toShort(value) : Units.toFull(value)}
                    hoverDetail={true}
                    minorTicksCount={9}
                    renderEventSuffix={event => (
                        <DetailEditor
                            onEdit={() => toggleBodyEventForm(true, event)}
                            onDelete={() => {
                                if (confirm('Opravdu smazat?')) {
                                    deleteEvent(event._id)
                                }
                            }} />
                    )}
                    tickHeight={15}
                    ticks={YEARS} />
                {this.renderAdd()}
            </section>
        )
    }

}

export default BodyTimeline.connect(
    ({ system, universe, panel }: Universis.Redux.StoreState) => ({
        strings: system.strings.bodyData,
        body: universe.body,
        isFormVisible: panel.isBodyEventFormVisible
    }),
    { toggleBodyEventForm, deleteEvent }
)