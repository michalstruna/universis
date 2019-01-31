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
    const plus = [0, 1000, 1500, 1800, 2000]
    const minus = [-1000]

    for (let i = 0; i < 8; i++) {
        minus.push(minus[minus.length - 1] * 10)
    }

    minus[minus.length - 1] = -13.8e9

    while (plus[plus.length - 1] < new Date().getFullYear()) {
        plus.push(Math.min(plus[plus.length - 1] + 100, new Date().getFullYear()))
    }

    plus.reverse()
    return plus.concat(minus)
}

const YEARS = generateYears()

const tmp = [
    { _id: '1', title: 'První', from: 2002, to: 2019, description: 'Toto je první poznámka' },
    { _id: '2', title: 'Druhý', from: 1850, to: 1850, description: 'Toto je druhá událost.' },
    { _id: '3', title: 'Třetí', from: 1950, to: 2003, description: 'Toto je třetí událost.' },
    { _id: '4', title: 'Čtvrtý', from: 2003, to: 2004, description: 'Toto je čtvrtá událost.' },
    { _id: '5', title: 'Pátý', from: 2019, to: 2019, description: 'Toto je pátá událost.' },
    { _id: '6', title: 'Šestý', from: 2007, to: 2014, description: 'Toto je šestá událost.' },
    { _id: '7', title: 'Sedmá', from: 1850, to: 2014, description: 'Toto je sedmá událost.' },
    { _id: '999', title: 'Sedmá', from: -4000, to: -3000, description: 'Toto je sedmá událost.' },
    {
        _id: '9',
        title: 'Čeljabinský meteor',
        from: 2013,
        to: 2013,
        description: '15metrový bolid o hmotnosti 10M kg dopadající rychlostí 17 km/s explodoval 30 km nad Ruskem. Síla výbuchu byla 30-150 kilotun TNT.'
    },
    {
        _id: '8',
        title: 'Množství CO2',
        from: 2013,
        to: 2013,
        description: 'Množství CO2 v atmosféře poprvé za 5 milionů let překročilo hodnotu 144 ppm.'
    }
]

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
        return value + (value / 1e3) * Math.sin(value)
    }

    /**
     * Get count of events in time interval.
     * @param from Start.
     * @param to End.
     * @returns Count of events.
     */
    private getEventsCount(from: number, to: number): number {
        return tmp.filter(event => (event.from >= from && event.from <= to) || (event.to >= from && event.to <= to)).length
    }

    public render(): React.ReactNode {
        const { body, events } = this.props

        if (!body.payload) {
            return null
        }

        const chartYears = [new Date().getFullYear(), 0, -1e4, -1e6, -1e8, -14e10]

        return (
            <section className='panel__body__timeline'>
                <section className='panel__body__timeline__preview'>
                    <section className='panel__body__timeline__preview--left'>
                        <LineChart
                            labels={chartYears.map(value => Units.toShort(value))}
                            values={chartYears.map((value, key) => this.getEventsCount(chartYears[key + 1], value))}
                            data={{ '2k': 4, '0': 3, '-10k': 4, '-1M': 0, '-100M': 9, '-1G': 7, '-14G': 2 }}
                            height={55}
                            width={300} />
                    </section>
                    <section className='panel__body__timeline__preview--right'>
                        <BodyPreview body={body.payload} size={100} />
                    </section>
                </section>
                <AsyncEntity
                    data={events}
                    success={() => (
                        <EventArea
                            columnsCount={4}
                            events={tmp}
                            formatCurrentValue={value => Units.toFull(this.obfuscateValue(value))}
                            formatTickValue={Units.toShort}
                            hoverDetail={true}
                            tickHeight={15}
                            ticks={YEARS}
                            minorTicksCount={9} />
                    )} />
            </section>
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