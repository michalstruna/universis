import * as Moment from 'moment'
import DurationConstructor = Moment.unitOfTime.DurationConstructor

/**
 * Utils for date.
 */
class Dates {

    /**
     * Units.
     */
    static DAY = 'days'
    static HOUR = 'hours'
    static MINUTE = 'minutes'
    static SECOND = 'seconds'

    public static add(count: DurationConstructor, unit: string, date: string = new Date().toISOString()): string {
        return Moment(date).add(count, unit).toISOString()
    }

    /**
     * Return relative date.
     * @param date Date.
     * @returns Relative date.
     */
    public static fromNow(date: string): string {
        return Moment(date).fromNow()
    }

}

export default Dates