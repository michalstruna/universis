/**
 * Interface for user score.
 */
declare interface IUserScore {

    /**
     * Count of gold medals.
     */
    gold: number

    /**
     * Count of silver medals.
     */
    silver: number

    /**
     * Count of bronze medals.
     */
    bronze: number

    /**
     * Karma of user (rating another users, bans, ...).
     */
    karma: number

    /**
     * Whole reputation of user.
     */
    reputation: number

}