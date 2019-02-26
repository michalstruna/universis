declare namespace Universis {

    /**
     * Interface for factory.
     */
    export interface Factory<T, E> {

        /**
         * Create instance of entity.
         * @param input Data.
         * @returns Instance of entity.
         */
        create(input: T): E

    }

}