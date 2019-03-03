/**
 * Utils for dates.
 */
class Dates {

    /**
     * ALl available formats.
     */
    public static FORMAT = {
        DATE: date => date.getDate() + '. ' + (date.getMonth() + 1) + '. ' + date.getFullYear()
    }

    /**
     * Format ISO date.
     * @param date ISO date.
     * @returns Date in format DD. MM. YYYY.
     */
    public static formatISO(date: string, formatter: Universis.Function<Date, string>): string {
        return formatter(new Date(date))
    }

}

export default Dates