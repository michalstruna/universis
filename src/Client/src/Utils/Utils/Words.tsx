/**
 * Utils for Words language.
 */
class Words {

    private constructor() {

    }

    private static FEMALE_SUFFIXES = ['a', 'e']
    private static FEMALE_SUFFIX = 'á'

    private static MALE_SUFFIX = 'ý'

    private static MIDDLE_SUFFIXES = ['o']
    private static MIDDLE_SUFFIX = 'é'

    /**
     * Concat adjective with substantive.
     * @param adjective Adjective.
     * @param substantive Substantive.
     * @returns Concated adjective and substantive.
     */
    public static concatAdjectiveWithSubstantive(adjective: string, substantive: string): string {
        const lastLetter = substantive[substantive.length - 1]
        let suffix

        if (Words.FEMALE_SUFFIXES.includes(lastLetter)) {
            suffix = Words.FEMALE_SUFFIX
        } else if (Words.MIDDLE_SUFFIXES.includes(lastLetter)) {
            suffix = Words.MIDDLE_SUFFIX
        } else {
            suffix = Words.MALE_SUFFIX
        }

        return adjective.replace(/.$/, suffix) + ' ' + substantive
    }


}

export default Words