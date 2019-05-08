/**
 * Utils for dates.
 */
class Dates {

    /**
     * ALl available formats.
     */
    public static FORMAT = {
        DATE: date => date.getDate() + '. ' + (date.getMonth() + 1) + '. ' + date.getFullYear(),
        YYYY_MM_DD: date => {
            const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
            const month = (date.getMonth() < 9) ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1)
            const year = date.getFullYear()
            return `${year}-${month}-${day}`
        }
    }

    /**
     * Format ISO date.
     * @param date ISO date.
     * @returns Date in format DD. MM. YYYY.
     */
    public static formatISO(date: string, formatter: Universis.Function<Date, string>): string {
        return formatter(new Date(date))
    }

    public static toInput(date: string): string {
        return Dates.FORMAT.YYYY_MM_DD(new Date(date))
    }

}

export default Dates