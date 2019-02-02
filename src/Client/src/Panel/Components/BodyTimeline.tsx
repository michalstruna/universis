import * as React from 'react'

import { StatelessComponent, Units, AsyncEntity, EventArea } from '../../Utils'
import { BodyPreview, getEvents } from '../../Universe'
import { LineChart } from '../../Charts'

interface IProps {
    strings: IStrings
    events: IAsyncEntity<Universis.Universe.Event[]>
    getEvents: Universis.Consumer<string>
    body: IAsyncEntity<IBody>
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
const CHART_YEARS = [0, -1e4, -1e5, -1e6, -1e7, -1e8, -1e9, -14e10]

class BodyTimeline extends StatelessComponent<IProps> {

    public componentWillMount() {
        const { getEvents, events, body } = this.props
        AsyncEntity.request(events, () => getEvents(body.payload._id))
    }

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
        const { events } = this.props
        return events.payload.filter(event => (
            (event.from < from && event.to > from) ||
            (event.from < to && event.to > to) ||
            (event.from > from && event.to < to)
        )).length
    }

    public render(): React.ReactNode {
        const { body, events } = this.props

        if (!body.payload) {
            return null
        }

        return (
            <AsyncEntity
                data={events}
                success={() => (
                    <section className='panel__body__timeline'>
                        <section className='panel__body__timeline__preview'>
                            <section className='panel__body__timeline__preview--left'>
                                <LineChart
                                    labels={CHART_YEARS.map(value => Units.toShort(value))}
                                    values={CHART_YEARS.map((value, key) => this.getEventsCount(value, key ? CHART_YEARS[key - 1] : new Date().getFullYear()))}
                                    height={55}
                                    width={300} />
                            </section>
                            <section className='panel__body__timeline__preview--right'>
                                <BodyPreview body={body.payload} size={100} />
                            </section>
                        </section>
                        <EventArea
                            columnsCount={5}
                            events={events.payload}
                            formatCurrentValue={value => Units.toFull(this.obfuscateValue(value))}
                            formatTickValue={Units.toShort}
                            formatDetailValue={value => value < 0 ? Units.toShort(value) : Units.toFull(value)}
                            hoverDetail={true}
                            minorTicksCount={9}
                            tickHeight={15}
                            ticks={YEARS} />
                    </section>
                )} />
        )
    }

}

export default BodyTimeline.connect(
    ({ system, universe }: IStoreState) => ({
        strings: system.strings.bodyData,
        body: universe.body,
        events: universe.events
    }),
    { getEvents }
)