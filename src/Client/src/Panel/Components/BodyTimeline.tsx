import * as ClassNames from 'classnames'
import * as React from 'react'

import { StatelessComponent, Units } from '../../Utils'

interface IProps {
    body: IBody
    strings: IStrings
}

const generateYears = (): number[] => {
    const plus = [0]
    const minus = [-1000]
    const minusMultiply = [2, 2.5, 2]

    for (let i = 0; i < 21; i++) {
        minus.push(minus[minus.length - 1] * minusMultiply[i % 3])
    }

    while (plus[plus.length - 1] < new Date().getFullYear()) {
        const last = plus[plus.length - 1]

        if (last < 1000) {
            plus.push(last + 500)
        } else if (last < 1500) {
            plus.push(last + 200)
        } else if (last < 1900) {
            plus.push(last + 100)
        } else {
            plus.push(Math.min(last + 20, new Date().getFullYear()))
        }
    }

    plus.reverse()
    return plus.concat(minus)
}

const YEARS = generateYears()

class BodyTimeline extends StatelessComponent<IProps> {

    /**
     * Timeline container.
     */
    private container: HTMLElement

    /**
     * Current hover time element.
     */
    private current: HTMLElement

    /**
     * Handler for mouse move.
     * @param event Mouse event.
     */
    private handleMouseMove = (event: React.MouseEvent): void => {
        const y = event.clientY - this.container.getBoundingClientRect().top
        this.current.textContent = Units.toFull(this.toAbsolute(y / 16.02))
        this.current.style.top = y + 'px'
    }

    /**
     * Convert year to relative value.
     * @param year Year.
     * @returns Relative value.
     */
    private toRelative(year: number): number {
        const index = year < YEARS[YEARS.length - 1] ? YEARS.length - 1 : YEARS.findIndex(value => value < year)
        const after = YEARS[index - 1]
        const before = YEARS[index]
        const offset = 1 - (year - before) / (after - before)
        return 1 + ((index - 1) * 10) + Math.round(offset * 10)
    }

    /**
     * Convert relative value to year.
     * @param value Relative value.
     * @returns Year.
     */
    private toAbsolute(value: number): number {
        const index = Math.floor(value / 10)
        const start = YEARS[index + 1]
        const end = YEARS[index]
        const offset = (end - start) * (1 - (value % 10) / 10)
        return Math.round(start + offset)
    }

    private renderYears(): React.ReactNode {
        const years = []

        for (let i = 0; i < YEARS.length * 10; i++) {
            const gridColumn = 5
            const gridRow = i + 1
            const year = YEARS[i / 10]

            if (i % 10) {
                years.push(
                    <section
                        key={i}
                        className={ClassNames('panel__body__timeline__step', { 'panel__body__timeline__step--major': i % 5 === 0 })}
                        style={{ gridColumn, gridRow }} />
                )
            } else {
                years.push(
                    <section
                        key={i}
                        className='panel__body__timeline__year'
                        style={{ gridColumn, gridRow }}>
                        {year < 0 ? '-' + Units.toShort(-YEARS[i / 10]) : year}
                    </section>
                )
            }
        }

        return years
    }

    private renderEvents(): React.ReactNode {
        return (
            <>
                <section
                    className='panel__body__timeline__event'
                    style={{ gridArea: `${this.toRelative(2017)}/1/${this.toRelative(2010)}/2` }}>
                    2010-2017
                </section>
                <section
                    className='panel__body__timeline__event'
                    style={{ gridArea: `${this.toRelative(2014)}/2/${this.toRelative(2007)}/4` }}>
                    2010-2017
                </section>
                <section
                    className='panel__body__timeline__event'
                    style={{ gridArea: `${this.toRelative(2019)}/1/${this.toRelative(-3.6e6)}/2` }}>
                    Čtvrtohory
                </section>
                <section
                    className='panel__body__timeline__event'
                    style={{ gridArea: `${this.toRelative(-3.6e6)}/1/${this.toRelative(-66e6)}/2` }}>
                    Třetihory
                </section>
                <section
                    className='panel__body__timeline__event'
                    style={{ gridArea: `${this.toRelative(-66e6)}/1/${this.toRelative(-252e6)}/2` }}>
                    Druhohory
                </section>
                <section
                    className='panel__body__timeline__event'
                    style={{ gridArea: `${this.toRelative(-252e6)}/1/${this.toRelative(-541e6)}/2` }}>
                    Prvohory
                </section>
                <section
                    className='panel__body__timeline__event'
                    style={{ gridArea: `${this.toRelative(-541e6)}/1/${this.toRelative(-2.5e9)}/2` }}>
                    Starohory
                </section>
                <section
                    className='panel__body__timeline__event'
                    style={{ gridArea: `${this.toRelative(-2.5e9)}/1/${this.toRelative(-4e9)}/2` }}>
                    Prahory
                </section>
                <section
                    className='panel__body__timeline__event'
                    style={{ gridArea: `${this.toRelative(-4e9)}/1/${this.toRelative(-4.6e9)}/2` }}>
                    Hadaikum
                </section>
            </>
        )
    }

    public render(): React.ReactNode {
        const { body } = this.props

        if (!body) {
            return null
        }

        return (
            <section
                className='panel__body__timeline'
                onMouseMove={this.handleMouseMove}
                ref={ref => this.container = ref}>
                <div
                    className='panel__body__timeline__current'
                    ref={ref => this.current = ref} />
                {this.renderYears()}
                {this.renderEvents()}
            </section>
        )
    }

}

export default BodyTimeline.connect(
    ({ system, universe }: IStoreState) => ({
        strings: system.strings.bodyData,
        body: universe.body.payload
    })
)