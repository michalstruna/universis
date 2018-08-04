/**
 * Interface for factory.
 */
declare interface IFactory<T, E> {

    /**
     * Create instance of entity.
     * @param input Data.
     * @returns Instance of entity.
     */
    create(input: T): E

}