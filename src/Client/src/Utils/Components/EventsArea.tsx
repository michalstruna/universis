import * as React from 'react'

import { StatelessComponent, EditorControl } from '../../Utils'
import EventForm from './EventForm'

interface IProps {
    columnsCount: number
    events: Universis.Event[]
    ticks: number[]
    tickHeight: number
    minorTicksCount?: number
    hoverDetail?: boolean
    formatCurrentValue?: Universis.Function<number, string>
    formatTickValue?: Universis.Function<number, string>
    formatDetailValue?: Universis.Function<number, string>
}

/**
 * Component for grid event area.
 */
class EventsArea extends StatelessComponent <IProps> {

    public static defaultProps = {
        formatCurrentValue: value => value,
        formatTickValue: value => value,
        formatDetailValue: value => value,
        minorTicksCount: 0
    }

    /**
     * HTML element for container.
     */
    private container: HTMLElement

    /**
     * HTML element for hover line.
     */
    private hoverLine: HTMLElement

    public shouldComponentUpdate(prevProps: IProps): boolean {
        return JSON.stringify(prevProps.events) !== JSON.stringify(this.props.events)
    }

    /**
     * On mouse move update line position.
     * @param event
     */
    private handleMouseMove = (event: React.MouseEvent): void => {
        const { tickHeight, formatCurrentValue } = this.props

        if (tickHeight) {
            const y = event.clientY - this.container.getBoundingClientRect().top
            this.hoverLine.textContent = formatCurrentValue(this.toValue(y / tickHeight))
            this.hoverLine.style.top = y + 'px'
        }
    }

    /**
     * Convert value to coordinate.
     * @param value Tick value.
     * @returns Coordinate value.
     */
    private toCoordinate(value: number): number {
        const { ticks, minorTicksCount } = this.props
        const index = value < ticks[ticks.length - 1] ? ticks.length - 1 : ticks.findIndex(tick => tick < value)
        const after = ticks[index - 1]
        const before = ticks[index]
        const offset = 1 - (value - before) / (after - before)

        return 1 + (index - 1) * (minorTicksCount + 1) + Math.round(offset * (minorTicksCount + 1))
    }

    /**
     * Convert coordinate to value.
     * @param coordinate Coordinate value.
     * @returns Tick.
     */
    private toValue(coordinate: number): number {
        const { ticks, minorTicksCount } = this.props
        const index = Math.floor(coordinate / (minorTicksCount + 1))
        const start = ticks[index + 1]
        const end = ticks[index]
        const offset = (end - start) * (1 - (coordinate % (minorTicksCount + 1)) / (minorTicksCount + 1))
        return start + offset
    }

    /**
     * Render , semi- and minor ticks.
     * @returns Ticks.
     */
    private renderTicks(): React.ReactNode {
        const { ticks, minorTicksCount, columnsCount, formatTickValue } = this.props
        const result = []

        for (let i = 0; i < (ticks.length - 1) * (minorTicksCount + 1) + 1; i++) {
            const gridRow = i + 1
            const tick = ticks[Math.round(i / (minorTicksCount + 1))]
            const gridColumn = columnsCount + 1

            if (i % (minorTicksCount + 1)) {
                result.push(
                    <section
                        key={i}
                        className={'events-area__minor-tick events-area__minor-tick--' + (i % (minorTicksCount + 1))}
                        style={{ gridColumn, gridRow }} />
                )
            } else {
                result.push(
                    <section
                        key={i}
                        className='events-area__major-tick'
                        style={{ gridColumn, gridRow }}>
                        {tick < 0 ? '-' + formatTickValue(-tick) : tick}
                    </section>
                )
            }
        }

        return result
    }

    /**
     * Render all events in event area.
     */
    private renderEvents(): React.ReactNode {
        const { events, columnsCount } = this.props
        const resources = new Array(columnsCount + 1).fill(null).map(item => new Array(150).fill(false))

        return events.map((event, key) => {
            const from = Math.max(this.toCoordinate(event.from), 4)
            const to = Math.min(this.toCoordinate(event.to), from - 3)

            let column

            for (let i = 1; i <= columnsCount; i++) {
                let isEmpty = true

                for (let j = to; j < from; j++) {
                    if (resources[i][j]) {
                        isEmpty = false
                        break
                    }
                }

                if (isEmpty) {
                    for (let j = to; j < from; j++) {
                        resources[i][j] = true
                    }

                    column = i
                    break
                }
            }

            return (
                <section
                    className={'events-area__event events-area__event--' + column}
                    key={key}
                    style={{ gridArea: `${to}/${column}/${from}/${column + 1}` }}>
                    {event.title}
                    {this.renderDetail(event)}
                </section>
            )
        })
    }

    private renderDetail(event: Universis.Event): React.ReactNode {
        const { hoverDetail, formatDetailValue } = this.props

        if (!hoverDetail) {
            return null
        }

        return (
            <section className='events-area__event__detail'>
                <div>
                    {event.from === event.to ? formatDetailValue(event.from) : (formatDetailValue(event.from) + ' až ' + formatDetailValue(event.to))}
                </div>
                <h3>
                    {event.title}
                </h3>
                <p>
                    {event.description}
                </p>
            </section>
        )
    }

    /**
     * Render line after hover.
     */
    private renderHoverLine(): React.ReactNode {
        const { tickHeight } = this.props

        if (!tickHeight) {
            return null
        }

        return (
            <div
                className='events-area__hover-line'
                ref={ref => this.hoverLine = ref} />
        )
    }

    /**
     * Render add button.
     */
    private renderAdd(): React.ReactNode {
        const { formatDetailValue } = this.props
        const column = 5
        const to: number = 8
        const from = 26
        const title = 'title'

        return (
            <>
                <section
                    className={'events-area__event events-area__event--' + column}
                    style={{ gridArea: `${to}/${column}/${from}/${column + 1}` }}>
                    {title}
                    <section className='events-area__event__detail'>
                        <EventForm form={'event'} />
                    </section>
                </section>
                <EditorControl
                    type={EditorControl.ADD}
                    onClick={() => console.log(Math.random())} />
            </>
        )
    }

    public render(): React.ReactNode {
        const { tickHeight } = this.props

        return (
            <section
                className='events-area'
                onMouseMove={this.handleMouseMove}
                style={{ gridAutoRows: tickHeight }}
                ref={ref => this.container = ref}>
                {this.renderHoverLine()}
                {this.renderTicks()}
                {this.renderEvents()}
                {this.renderAdd()}
            </section>
        )
    }

}

export default EventsArea