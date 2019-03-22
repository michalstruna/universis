import { Units } from '../Client/src/Utils'

/**
 * Utils for date.
 */
class Dates {

    public static MILLISECOND = Units.TIME.MS
    public static SECOND = Units.TIME.S
    public static MINUTE = Units.TIME.M
    public static DAY = Units.TIME.D
    public static YEAR = Units.TIME.Y

    public static add(count: number, unit: Universis.Unit, date: string = new Date().toISOString()): string {
        const dateObject = new Date(date)
        dateObject.setTime(dateObject.getTime() + count * unit.value)
        return dateObject.toISOString()
    }

}

export default Dates